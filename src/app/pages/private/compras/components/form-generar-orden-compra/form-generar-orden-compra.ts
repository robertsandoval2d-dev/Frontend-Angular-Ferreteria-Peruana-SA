import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CompraService } from '../../services/compra.service';
import { VistaPreviaOCResponse } from '../../models/response/vista-previa-oc-response';
import { ToastService } from '../../../../../core/services/toast.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { OrdenCompraRequest } from '../../models/request/orden-compra-request';
import { DetalleOrdenCompra } from '../../models/request/detalle-orden-compra';

@Component({
  selector: 'app-form-generar-orden-compra',
  imports: [ReactiveFormsModule, CurrencyPipe, NgbTooltip],
  templateUrl: './form-generar-orden-compra.html',
  styleUrl: './form-generar-orden-compra.scss',
})
export class FormGenerarOrdenCompra implements OnInit {
  private compraService = inject(CompraService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  ListaOCPrevia: VistaPreviaOCResponse[]=[];
  ordenSeleccionada: VistaPreviaOCResponse | null = null;

  formularioCompra = this.fb.group({
    proveedorSeleccionado: new FormControl<VistaPreviaOCResponse | null>(null),
    plazoFechaMaximo: ['', [Validators.required, this.fechaRangoValidator(4)]],
    detallesArray: this.fb.array([]) // cantidades
  });

  get detallesArray(): FormArray {
    return this.formularioCompra.get('detallesArray') as FormArray;
  }

  get plazoFechaMaximo(): FormControl{
    return this.formularioCompra.get('plazoFechaMaximo') as FormControl;
  }

  ngOnInit() {
    this.cargarVistaPreviaOrdenCompra();

    this.formularioCompra.get('proveedorSeleccionado')?.valueChanges.subscribe(orden =>{
      this.ordenSeleccionada=null;
      this.cdr.detectChanges();

      this.detallesArray.clear();

      if (orden && orden.detalles) {
        orden.detalles.forEach(detalle => {
          this.detallesArray.push(this.fb.group({
            cantidad: [detalle.cantidad, [Validators.required,Validators.pattern(/^-?[0-9]+$/), Validators.min(1)]]
          }));
        });

        this.ordenSeleccionada = orden;
        this.cdr.detectChanges();
      }
    });

    this.detallesArray.valueChanges.subscribe(valoresFilas => {
      this.recalcularTotalReactivo(valoresFilas);
    });
  }

  cargarVistaPreviaOrdenCompra(){
    this.compraService.listarVistaPreviaOC().subscribe({
      next: (respuestaBackend) => {
        this.ListaOCPrevia=respuestaBackend;
        this.cdr.detectChanges();
        console.log('Vista previa cargado correctamente',respuestaBackend);
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend);

        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    })
  }

  recalcularTotalReactivo(valoresFilas: any[]) {
    if (this.ordenSeleccionada) {
      let nuevoTotal = 0;
      valoresFilas.forEach((fila, index) => {
        const precioOriginal = this.ordenSeleccionada!.detalles[index].precioUnidad;
        nuevoTotal += (fila.cantidad * precioOriginal);
      });
      this.ordenSeleccionada.montoTotalCalculado = nuevoTotal;
    }
  }

  generarOrden() {
    if (this.formularioCompra.invalid || !this.ordenSeleccionada) {
      this.toastService.error('Revisa las cantidades ingresadas.');
      return;
    }
    const fechaRaw = this.formularioCompra.get('plazoFechaMaximo')?.value;
    const plazoFechaMaximoLocalDateTime = fechaRaw ? `${fechaRaw}T23:59:59` : '';

    const detallesPayload: DetalleOrdenCompra[] = this.ordenSeleccionada.detalles.map((detalleOrig, index) => {
      const cantidadActualizada = this.detallesArray.at(index).get('cantidad')?.value;
      
      return {
        nombreLinea: detalleOrig.nombreLinea,
        productoId: detalleOrig.productoId,
        cantidad: cantidadActualizada,
        precioUnidad: detalleOrig.precioUnidad,
        subtotal: cantidadActualizada * detalleOrig.precioUnidad
      };
    });

    const payload: OrdenCompraRequest = {
      plazoFechaMaximo: plazoFechaMaximoLocalDateTime,
      proveedorId: this.ordenSeleccionada.proveedorId,
      montoTotalCalculado: this.ordenSeleccionada.montoTotalCalculado,
      detalles: detallesPayload
    };

    console.log('Payload listo para el backend:', payload);

    this.compraService.generarOrdenCompra(payload).subscribe({
      next: (respuestaBackend) => {
        console.log('Orden de compra generado:', respuestaBackend);
        this.toastService.success('Orden de compra generado exitosamente');
        this.resetearVista();
        this.cargarVistaPreviaOrdenCompra();
        this.cdr.detectChanges();
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    });

  }

  resetearVista() {
    this.detallesArray.clear();
    
    this.formularioCompra.reset({
      proveedorSeleccionado: null,
      plazoFechaMaximo: ''
    });

    this.ordenSeleccionada = null;
    this.cargarVistaPreviaOrdenCompra();
    this.cdr.detectChanges();
  }

  getErrorMessageArray(index: number, controlName: string): string {
    const control = this.detallesArray.at(index).get(controlName);

    if (control?.hasError('required')) {
      switch(controlName) {
        case 'cantidad':
          return 'La cantidad es obligatoria';
        default:
          return 'Este campo es obligatorio';
      }
    }

    if (control?.hasError('pattern') && controlName === 'cantidad') {
      return 'Solo se aceptan números';
    }

    if (control?.hasError('min') && controlName === 'cantidad') {
      const valorMinimo = control.errors?.['min'].min;
      return `La cantidad debe ser al menos ${valorMinimo}`;
    }

    return '';
  }

  getErrorMessage(controlName: string): string {
    const control = this.formularioCompra.get(controlName);

    if (control?.hasError('required')) {
      switch(controlName) {
        case 'plazoFechaMaximo':
          return 'La fecha es obligatoria';
        default:
          return 'Este campo es obligatorio';
      }
    }

    if (control?.hasError('fechaPasada') && controlName === 'plazoFechaMaximo') {
      return 'La fecha no puede ser anterior al día de hoy';
    }

    if (control?.hasError('fechaMuyFutura') && controlName === 'plazoFechaMaximo') {
      const meses = control.errors?.['fechaMuyFutura'].meses;
      return `La fecha no puede exceder los ${meses} meses a futuro`;
    }

    return '';
  }

  private fechaRangoValidator(mesesMaximo: number = 4): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      let fechaInput: Date;
      if (typeof control.value === 'string') {
        const partes = control.value.split('-');
        if (partes.length !== 3) return null; 
        
        fechaInput = new Date(
          parseInt(partes[0], 10),
          parseInt(partes[1], 10) - 1,
          parseInt(partes[2], 10)
        );
      } else {
        fechaInput = new Date(control.value);
      }
      fechaInput.setHours(0, 0, 0, 0);

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const limiteFuturo = new Date(hoy);
      limiteFuturo.setMonth(limiteFuturo.getMonth() + mesesMaximo);

      if (fechaInput < hoy) {
        return { fechaPasada: true };
      }

      if (fechaInput > limiteFuturo) {
        return { fechaMuyFutura: { meses: mesesMaximo } };
      }

      return null;
    };
  }
}

import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CompraService } from '../../services/compra.service';
import { VistaPreviaOCResponse } from '../../models/response/vista-previa-oc-response';
import { ToastService } from '../../../../../core/services/toast.service';
import { OrdenCompraRequest } from '../../models/request/orden-compra-request';
import { DetalleOrdenCompra } from '../../models/request/detalle-orden-compra';

@Component({
  selector: 'app-form-generar-orden-compra',
  imports: [ReactiveFormsModule, CurrencyPipe],
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
    plazoFechaMaximo: ['', [Validators.required]],
    detallesArray: this.fb.array([]) // cantidades
  });

  get detallesArray(): FormArray {
    return this.formularioCompra.get('detallesArray') as FormArray;
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
            cantidad: [detalle.cantidad, [Validators.required, Validators.min(1)]]
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

  construirFormArray(orden: VistaPreviaOCResponse | null) {
    this.detallesArray.clear();

    if (orden && orden.detalles) {
      orden.detalles.forEach(detalle => {
        const filaForm = this.fb.group({
          cantidad: [detalle.cantidad, [Validators.required, Validators.min(1)]]
        });
        this.detallesArray.push(filaForm);
      });
    }
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
}

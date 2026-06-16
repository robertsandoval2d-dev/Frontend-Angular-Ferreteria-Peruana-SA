import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CompraService } from '../../services/compra.service';
import { ProductoCatalogoResponse } from '../../models/response/producto-catalogo-response';
import { ToastService } from '../../../../../core/services/toast.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { CronogramaCreateRequest } from '../../models/request/cronograma-create-request';

@Component({
  selector: 'app-form-generar-cronograma',
  imports: [ReactiveFormsModule,NgbTooltip],
  templateUrl: './form-generar-cronograma.html',
  styleUrl: './form-generar-cronograma.scss',
})
export class FormGenerarCronograma implements OnInit{
  private compraService = inject(CompraService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  listaProductosCatalogo: ProductoCatalogoResponse[] =[];

  formularioCronograma: FormGroup = this.fb.group({
    lineas: this.fb.array([])
  });

  get lineas(): FormArray{
    return this.formularioCronograma.get('lineas') as FormArray;
  }

  ngOnInit() {
    this.cargarCatalogoProductos();
    this.agregarNuevaLinea();
  }

  cargarCatalogoProductos(){
    this.compraService.listarProductosProveedor().subscribe({
      next: (respuestaBackend) => {
        this.listaProductosCatalogo = respuestaBackend;
        this.cdr.detectChanges();
        console.log('catalogo productos cargado correctamente');
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    })
  }

  crearLineaFormGroup(): FormGroup {
    const fila = this.fb.group({
      producto: [null, Validators.required],
      proveedorId: [{ value: null, disabled: true }, Validators.required],
      cantidad: [null, [Validators.required,Validators.pattern(/^-?[0-9]+$/), Validators.min(1)]],
      fechaRequerida: ['', [Validators.required, this.fechaRangoValidator(4)]]
    });

    fila.get('producto')?.valueChanges.subscribe((productoSeleccionado) => {
      const controlProveedor = fila.get('proveedorId');
      controlProveedor?.setValue(null);

      if (productoSeleccionado) {
        controlProveedor?.enable();
      } else {
        controlProveedor?.disable();
      }
    });

    return fila;
  }

  agregarNuevaLinea(): void {
    this.lineas.push(this.crearLineaFormGroup());
  }

  eliminarLinea(index: number): void {
    if (this.lineas.length > 1) {
      this.lineas.removeAt(index);
    } else {
      this.toastService.error('Debe haber al menos una línea en el cronograma.');
    }
  }

  guardarCronograma(){
    if (this.formularioCronograma.invalid) {
      this.formularioCronograma.markAllAsTouched();
      return;
    }

    const requests: CronogramaCreateRequest[] = this.lineas.controls.map((control) => {
      const productoSeleccionado = control.get('producto')?.value;
      return {
        productoId: productoSeleccionado.productoId,
        proveedorId: Number(control.get('proveedorId')?.value),
        cantidad: Number(control.get('cantidad')?.value),
        fechaRequerida: control.get('fechaRequerida')?.value
      };
    });

    this.compraService.generarCronograma(requests).subscribe({
      next: (respuestaBackend) => {
        console.log('Cronograma generado',respuestaBackend);
        this.toastService.success('Cronograma generado');
        
        this.lineas.clear(); 
        this.formularioCronograma.reset(); 
        this.agregarNuevaLinea();
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    })
  }

  getErrorMessage(index: number, controlName: string): string {
    const control = this.lineas.at(index).get(controlName);

    if (control?.hasError('required')) {
      switch(controlName) {
        case 'cantidad':
          return 'La cantidad es obligatoria';
        case 'fechaRequerida':
          return 'La fecha es obligatoria';
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

    if (control?.hasError('fechaPasada') && controlName === 'fechaRequerida') {
      return 'La fecha no puede ser anterior al día de hoy';
    }

    if (control?.hasError('fechaMuyFutura') && controlName === 'fechaRequerida') {
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

import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompraService } from '../../services/compra.service';
import { ProductoCatalogoResponse } from '../../models/response/producto-catalogo-response';
import { ToastService } from '../../../../../core/services/toast.service';

import { CronogramaCreateRequest } from '../../models/request/cronograma-create-request';

@Component({
  selector: 'app-form-generar-cronograma',
  imports: [ReactiveFormsModule],
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
      cantidad: [null, [Validators.required, Validators.min(1)]],
      fechaRequerida: ['', Validators.required]
    });

    // 3. LA MAGIA: Escuchamos los cambios de producto de ESTA FILA en específico
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
    // Si faltan datos o hay errores, detenemos el proceso y marcamos los campos en rojo
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
}

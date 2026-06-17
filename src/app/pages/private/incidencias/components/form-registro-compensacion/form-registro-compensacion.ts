import { Component, Output, Input, EventEmitter, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RegistrarCompensacionRequest } from '../../models/request/registrar-compensacion-request';

import { IncidenciasService } from '../../services/incidencias.service';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-form-registro-compensacion',
  imports: [ReactiveFormsModule, DatePipe, CurrencyPipe],
  templateUrl: './form-registro-compensacion.html',
  styleUrl: './form-registro-compensacion.scss',
})
export class FormRegistroCompensacion implements OnInit{
  private fb = inject(FormBuilder);
  private incidenciasService = inject(IncidenciasService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  registerForm: FormGroup = this.fb.group({
    tipoCompensacion: ['', Validators.required],
    motivo: ['', Validators.required],
    terminosAceptados: [false, Validators.requiredTrue],
  });

  montoCalculado = 0;

  ngOnInit(){
    this.registerForm.get('tipoCompensacion')?.valueChanges.subscribe(value => {
      this.calcularMonto(Number(value));
    });
  }
  
  @Input() pedidoVencido: any = null;

  calcularMonto(porcentaje: number) {
    if (!porcentaje) {
      this.montoCalculado = 0;
      return;
    }
    this.montoCalculado = (this.pedidoVencido.montoTotalPedido * porcentaje) / 100;
  }

  registrarCompensacion(){
    if(this.registerForm.valid){
      const compensacionRequest:RegistrarCompensacionRequest = {
        pedidoId: this.pedidoVencido?.pedidoId,
        diasRetraso: this.pedidoVencido?.diasRetraso,
        montoCompensacion: this.montoCalculado
      };

      this.incidenciasService.registrarCompensacion(compensacionRequest).subscribe({
        next:(respuestaBackend) => {
          console.log('respuesta del back: ', respuestaBackend);
          this.toastService.success("Compensación registrada correctamente");
          this.registerForm.reset();
          this.incidenciasService.notifyRefresh();
          this.onCerrar.emit();
        },
        error: (errorBackend) => {
          console.error('Estructura completa del error',errorBackend)
          
          const mensaje = errorBackend.error?.message || 'Error desconocido'
          this.toastService.error(mensaje);
        }
      })
    }else{
      console.log('Falta rellenar el formulario');
    }
  }

  @Output() onCerrar = new EventEmitter<void>();

  cancelarRegistro(){
    this.onCerrar.emit();
  }
}

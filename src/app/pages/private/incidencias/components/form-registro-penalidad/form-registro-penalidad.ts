  import { Component, Output, Input, EventEmitter, inject, OnInit, ChangeDetectorRef } from '@angular/core';
  import { DatePipe, CurrencyPipe } from '@angular/common';
  import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

  import { RegistrarPenalidadRequest } from '../../models/request/registrar-penalidad-request';

  import { IncidenciasService } from '../../services/incidencias.service';
  import { ToastService } from '../../../../../core/services/toast.service';

  @Component({
    selector: 'app-form-registro-penalidad',
    imports: [ReactiveFormsModule, DatePipe, CurrencyPipe],
    templateUrl: './form-registro-penalidad.html',
    styleUrl: './form-registro-penalidad.scss',
  })
  export class FormRegistroPenalidad implements OnInit{

    private fb = inject(FormBuilder);
    private incidenciasService = inject(IncidenciasService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    registerForm: FormGroup = this.fb.group({
      tipoPenalidad: ['', Validators.required],
      motivo: ['', Validators.required],
      terminosAceptados: [false, Validators.requiredTrue],
    });

    montoCalculado = 0;

    ngOnInit() {
      this.registerForm.get('tipoPenalidad')?.valueChanges.subscribe(value => {
        this.calcularMonto(Number(value));
      });
    }

    calcularMonto(porcentaje: number) {
      if (!porcentaje) {
        this.montoCalculado = 0;
        return;
      }
      this.montoCalculado = (this.ordenVencida.monto * porcentaje) / 100;
    }

    @Input() ordenVencida: any = null;

    registrarPenalidad(){
      if(this.registerForm.valid){
        const penalidadRequest:RegistrarPenalidadRequest = {
          ordenCompraId: this.ordenVencida?.ordenCompraId,
          diasRetraso: this.ordenVencida?.diasRetraso,
          montoPenalidad: this.montoCalculado
        };

        this.incidenciasService.registrarPenalidad(penalidadRequest).subscribe({
          next:(respuestaBackend) => {
            console.log('respuesta del back: ', respuestaBackend);
            this.toastService.success("Penalidad Registrada Correctamente");
            this.onCerrar.emit();
          },
          error:(errorBackend) => {
            console.log('No cargaron las sucursales correctamente: ', errorBackend);
            this.toastService.error("Penalidad no registrada correctamente");
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

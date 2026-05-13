import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonPipe } from '@angular/common';
import { TrabajadorRequest } from '../../models/request/trabajador-request';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../../core/services/toast.service';


@Component({
  selector: 'app-form-registro-usuario',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './form-registro-usuario.html',
  styleUrl: './form-registro-usuario.scss',
})
export class FormRegistroUsuario implements OnInit{
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private usuariosService = inject(UserService);

  registroForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    dni: ['', [Validators.required, Validators.maxLength(8)]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    rol: ['', Validators.required],
    tiendaId: [''],
    lineaId: ['']
  })

  ngOnInit() {
    this.registroForm.get('rol')?.valueChanges.subscribe(rolSeleccionado => {

      const storeControl = this.registroForm.get('tiendaId');
      const lineControl = this.registroForm.get('lineaId');

      if (rolSeleccionado === 'JEFE_DE_LINEA') {
        storeControl?.setValidators(Validators.required);
        lineControl?.setValidators(Validators.required);
      } 
      else if (rolSeleccionado === 'ALMACENERO' || rolSeleccionado === 'ADMINISTRADOR_DE_TIENDA') {
        storeControl?.setValidators(Validators.required);
        
        lineControl?.clearValidators();
        lineControl?.setValue('');
      }
      else if (rolSeleccionado === 'ADMIN') {
        storeControl?.clearValidators();
        lineControl?.clearValidators();
        
        storeControl?.setValue('');
        lineControl?.setValue('');
      }

      storeControl?.updateValueAndValidity();
      lineControl?.updateValueAndValidity();
    });
  }

  guardarUsuario() {
    if (this.registroForm.valid){
      const requestParaSpringBoot: TrabajadorRequest = this.registroForm.value;
      console.log('Datos enviados a SpringBoot', this.registroForm.value)

      this.usuariosService.registrarTrabajador(requestParaSpringBoot).subscribe({
        next: (respuestaBackend) => {
          console.log('¡Éxito total! Spring Boot dice:', respuestaBackend);
          this.toastService.success('¡Trabajador registrado correctamente!');
          // alert('¡Trabajador registrado correctamente!');
          this.registroForm.reset();
          // Aquí podrías mostrar un Toast de éxito o cerrar el Modal
        },
        error: (errorBackend) => {
          console.error('El backend rechazó la petición:', errorBackend);
          alert('Hubo un error al registrar. Revisa la consola.');
          // Aquí mostrarías un Toast de error ("El DNI ya existe", etc.)
        }
      });

    } else{
      this.registroForm.markAllAsTouched();
      console.log('Faltan campos por llenar')
    }
  }
}

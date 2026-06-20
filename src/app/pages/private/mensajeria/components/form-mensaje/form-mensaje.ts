import { Component, EventEmitter, Output, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MensajeRequest } from '../../models/request/mensaje-request';
import { MensajeriaService } from '../../services/mensajeria-service';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-form-mensaje',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-mensaje.html',
  styleUrl: './form-mensaje.scss',
})
export class FormMensaje {

  private mensajeriaService = inject(MensajeriaService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  

  formMensaje: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
    usernameDestino: ['', [Validators.required]]
  })

  enviarMensaje(){
    if(this.formMensaje.valid){
      const requestMensaje: MensajeRequest = this.formMensaje.value;
      console.log('Form enviado: ', requestMensaje);
      this.mensajeriaService.enviarMensaje(requestMensaje).subscribe({
        next: (respuestaBackend) => {
          console.log('Respuesta del Backend: ', respuestaBackend);
          this.formMensaje.reset();
          this.OnCerrarNewMessage.emit();
          this.mensajeriaService.notifyRefresh();
          this.toastService.success(respuestaBackend.mensaje);
        },
        error: (errorBackend) => {
          console.log('Error: ', errorBackend);
          this.toastService.error(errorBackend.error.message);
        }
      })
    }
    else{
      console.log('Por favor completa todos los campos.');
    }
  }

@Output() OnCerrarNewMessage = new EventEmitter<void>();

closeNewMessage(){
  this.OnCerrarNewMessage.emit();
}

}

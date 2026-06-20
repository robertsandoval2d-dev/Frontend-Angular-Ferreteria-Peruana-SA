import { Component, EventEmitter, Input } from '@angular/core';

import { FormMensaje } from '../../components/form-mensaje/form-mensaje';
import { TablaMensajes } from '../../components/tabla-mensajes/tabla-mensajes';
import { ViewMensaje } from '../../components/view-mensaje/view-mensaje';
import { MensajeListResponse } from '../../models/response/mensaje-list-response';

@Component({
  selector: 'app-mensajeria',
  imports: [FormMensaje, TablaMensajes, ViewMensaje],
  templateUrl: './mensajeria.html',
  styleUrl: './mensajeria.scss',
})
export class Mensajeria {

  formMessage: boolean = false;

  newMessage(){
    this.formMessage = true;
  }

  closeMessage(){
    this.formMessage = false;
  }

  viewMessage : boolean = false;
  mensajeSeleccionado: MensajeListResponse | null = null

  openViewMessage(mensaje: any){
    this.viewMessage = true;
    this.mensajeSeleccionado = mensaje;
  }

  closeViewMessage(){
    this.viewMessage = false;
  }
}

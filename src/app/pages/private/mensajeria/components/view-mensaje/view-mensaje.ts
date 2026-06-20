import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MensajeListResponse } from '../../models/response/mensaje-list-response';
import { MensajeViewRequest } from '../../models/request/mensaje-view-request';
import { MensajeriaService } from '../../services/mensajeria-service';
import { SessionService } from '../../../../../core/auth/services/session.service';

@Component({
  selector: 'app-view-mensaje',
  imports: [DatePipe],
  templateUrl: './view-mensaje.html',
  styleUrl: './view-mensaje.scss',
})
export class ViewMensaje implements OnInit{

  @Input() message: MensajeListResponse | null = null;

  private mensajeriaService = inject(MensajeriaService);
  private sessionService = inject(SessionService);
  
  ngOnInit()  {
    if (!this.message) return;
    if (this.message.leido) return;
    if (this.message.emisorUsername === this.sessionService.getUsername()) return;
    this.marcarLeido();
  }
  
  marcarLeido() {
    if(!this.message) return;

    const menssageUpdate: MensajeViewRequest = {
      mensajeId: this.message.mensajeId,
      titulo: this.message.titulo,
      mensaje: this.message.mensaje,
      emisorId: this.message.emisorId,
      emisorUsername: this.message.emisorUsername,
      receptorId: this.message.receptorId,
      receptorUsername: this.message.receptorUsername,
      fechaEnvio: this.message.fechaEnvio,
      leido: true
    }

  this.mensajeriaService.marcarLeido(this.message?.mensajeId, menssageUpdate).subscribe({
      next: () => {
        this.message!.leido = true;
      },
      error: (errorBackend) => {
        console.log('Error: ', errorBackend);
      }
    });
  }

  @Output() OnCerrarViewMessage = new EventEmitter<void>();

  cerrarViewMessage(){
    this.OnCerrarViewMessage.emit();
  }
}

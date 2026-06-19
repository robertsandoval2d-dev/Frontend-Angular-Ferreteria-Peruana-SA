import { Component, inject, OnInit, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MensajeListResponse } from '../../models/response/mensaje-list-response';
import { MensajeriaService }  from '../../services/mensajeria-service';
import { SessionService } from '../../../../../core/auth/services/session.service';

@Component({
  selector: 'app-tabla-mensajes',
  imports: [DatePipe],
  templateUrl: './tabla-mensajes.html',
  styleUrl: './tabla-mensajes.scss',
})
export class TablaMensajes implements OnInit{

  private cdr = inject(ChangeDetectorRef);
  private sessionService = inject(SessionService);
  
  mensajeriaService = inject(MensajeriaService);
  listaMensajes : MensajeListResponse[] = [];
  listaFiltrada: MensajeListResponse[] = [];

  tipoMensaje : string = 'recibidos';
  username = this.sessionService.getUsername();

  filtrarMensaje(tipo: string){
    this.tipoMensaje = tipo; 
    switch(tipo){
      case 'enviados':
        this.listaFiltrada = this.listaMensajes.filter(mensaje => mensaje.emisorUsername === this.username);
        break;
      case 'recibidos':
        this.listaFiltrada = this.listaMensajes.filter(mensaje => mensaje.receptorUsername === this.username);
        break;
      default:
        this.listaFiltrada = this.listaMensajes.filter(mensaje => mensaje.emisorUsername === this.username);
        break;
    }
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.cargarMensajes();
  }

  cargarMensajes(){
    this.mensajeriaService.listarMensajes().subscribe({
      next:(respuestaBackend) =>{
        this.listaMensajes = respuestaBackend;
        this.filtrarMensaje(this.tipoMensaje);   
        console.log("Llegó las lista de mensajes: ", respuestaBackend);
      },
      error:(errorBackend) => {
        console.log("Error en el envío: ", errorBackend);
      }
    })
  }

}

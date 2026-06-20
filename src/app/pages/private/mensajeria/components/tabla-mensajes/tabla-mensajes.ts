import { Component, inject, OnInit, ChangeDetectorRef, EventEmitter, Output, DestroyRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PageEvent, MatPaginatorModule, MatPaginator  } from '@angular/material/paginator';

import { MensajeListResponse } from '../../models/response/mensaje-list-response';
import { MensajeriaService }  from '../../services/mensajeria-service';
import { SessionService } from '../../../../../core/auth/services/session.service';

@Component({
  selector: 'app-tabla-mensajes',
  standalone: true,
  imports: [ DatePipe, MatPaginatorModule ],
  templateUrl: './tabla-mensajes.html',
  styleUrl: './tabla-mensajes.scss',
})
export class TablaMensajes implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private sessionService = inject(SessionService);
  private destroyRef = inject(DestroyRef);
  
  mensajeriaService = inject(MensajeriaService);
  listaMensajes : MensajeListResponse[] = [];
  listaFiltrada: MensajeListResponse[] = [];

  tipoMensaje : string = 'recibidos';
  mensajesNoLeidos: number = 0;
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
    this.pageIndex = 0;
    this.paginator?.firstPage();
    this.mensajesNoLeidos = this.listaFiltrada.filter(m => !m.leido).length;

    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.cargarMensajes();
        this.mensajeriaService.$refresh.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cargarMensajes();
    });
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

  @Output() onNewMessageClick = new EventEmitter<void>();
  @Output() onOpenMessageClick = new EventEmitter<MensajeListResponse>();

  newMessage(){
    this.onNewMessageClick.emit();
  }

  openMessage(mensaje: MensajeListResponse){
    this.onOpenMessageClick.emit(mensaje);
  }


  pageIndex = 0;
  pageSize = 6;

  get mensajesPaginados() {
    const inicio = this.pageIndex * this.pageSize;
    return this.listaFiltrada.slice(inicio, inicio + this.pageSize);

  }

  @ViewChild(MatPaginator)
    paginator!: MatPaginator;

  cambiarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}

import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';

import { MensajeListResponse } from '../../models/response/mensaje-list-response';
import { MensajeriaService }  from '../../services/mensajeria-service';

@Component({
  selector: 'app-tabla-mensajes',
  imports: [],
  templateUrl: './tabla-mensajes.html',
  styleUrl: './tabla-mensajes.scss',
})
export class TablaMensajes implements OnInit{

  private cdr = inject(ChangeDetectorRef);
  
  mensajeriaService = inject(MensajeriaService);
  listaMensajes : MensajeListResponse[] = [];

  ngOnInit() {
    this.cargarMensajes();
    this.cdr.detectChanges();
    
  }



  cargarMensajes(){
    this.mensajeriaService.listarMensajes().subscribe({
      next:(respuestaBackend) =>{
        this.listaMensajes = respuestaBackend
        console.log("Llegó las lista de mensajes: ", respuestaBackend);
      },
      error:(errorBackend) => {
        console.log("Error en el envío: ", errorBackend);
      }
    })
  }
}

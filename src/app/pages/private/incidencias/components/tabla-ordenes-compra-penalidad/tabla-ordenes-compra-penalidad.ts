import { Component, Output, EventEmitter, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';



import { OrdenCompraResponse } from '../../models/response/orden-compra-response';
import { IncidenciasService } from '../../services/incidencias.service';

@Component({
  selector: 'app-tabla-ordenes-compra-penalidad',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './tabla-ordenes-compra-penalidad.html',
  styleUrl: './tabla-ordenes-compra-penalidad.scss',
})
export class TablaOrdenesCompraPenalidad implements OnInit{

  private incidenciaService = inject(IncidenciasService);
  private cdr = inject(ChangeDetectorRef);

  listaOrdenes: OrdenCompraResponse[] = [];

  ngOnInit() {
    this.listarOrdenesCompraVencidas();
  }


  listarOrdenesCompraVencidas(){
    this.incidenciaService.listarOrdenesCompraVencidas().subscribe({
      next:(respuestaBackend) => {
        this.listaOrdenes = respuestaBackend;
        this.cdr.detectChanges();
        console.log('Llegaron las Ordenes: ', respuestaBackend);
      },
      error: (errorBackend) => {
        console.log('Error: ', errorBackend)
      }
    });
  }

  @Output() onAbrir = new EventEmitter<any>();

  registroPenalidad(ordenInfo: any){
    this.onAbrir.emit(ordenInfo);
  }
}

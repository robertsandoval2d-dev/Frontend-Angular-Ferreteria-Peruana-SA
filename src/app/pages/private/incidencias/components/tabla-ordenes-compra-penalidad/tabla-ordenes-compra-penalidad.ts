import { Component, Output, EventEmitter, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';


import { Observable, map, timer } from 'rxjs';


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
  textoActualizacion$!: Observable<string>;
  

  ngOnInit() {
    this.listarOrdenesCompraVencidas();
    const tiempoCarga = new Date();

    this.textoActualizacion$ = timer(0,60000).pipe(
      map(() => {
        const ahora = new Date();
        const minutos = Math.floor((ahora.getTime() - tiempoCarga.getTime()) / 60000);

        if (minutos < 1) {
          return 'Actualizado hace unos segundos';
        } else if (minutos === 1) {
          return 'Actualizado hace 1 min';
        } else {
          return `Actualizado hace ${minutos} min`;
        }
      })
    );
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

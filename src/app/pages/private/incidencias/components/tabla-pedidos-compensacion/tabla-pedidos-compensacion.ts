import { Component, Output, EventEmitter, DestroyRef, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, map, timer } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ToastService } from '../../../../../core/services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IncidenciasService } from '../../services/incidencias.service';
import { PedidoResponse } from '../../models/response/pedido-response';

@Component({
  selector: 'app-tabla-pedidos-compensacion',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './tabla-pedidos-compensacion.html',
  styleUrl: './tabla-pedidos-compensacion.scss',
})
export class TablaPedidosCompensacion implements OnInit{
  private incidenciasService = inject(IncidenciasService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  textoActualizacion$!: Observable<string>;

  listaPedidos: PedidoResponse[] = [];

  ngOnInit() {
    this.listarClientesPedidosVencidos();

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

    this.incidenciasService.refresh$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.listarClientesPedidosVencidos();
    });
  }

  listarClientesPedidosVencidos(){
    this.incidenciasService.listarClientesPedidosVencidos().subscribe({
      next:(respuestaBackend) => {
        this.listaPedidos = respuestaBackend;
        this.cdr.detectChanges();
        console.log('Lista de pedidos vencidos cargado correctamente',respuestaBackend);
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend)
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    });
  }

  @Output() onAbrir = new EventEmitter<any>();

  registroPenalidad(pedidoInfo: any){
    this.onAbrir.emit(pedidoInfo);
  }

}

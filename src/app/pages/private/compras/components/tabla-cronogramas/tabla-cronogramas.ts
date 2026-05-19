import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, map, timer } from 'rxjs';
import { CompraService } from '../../services/compra.service'; 
import { CronogramaResponse } from '../../models/response/cronograma-response';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-tabla-cronogramas',
  imports: [],
  templateUrl: './tabla-cronogramas.html',
  styleUrl: './tabla-cronogramas.scss',
})
export class TablaCronogramas implements OnInit{
  private compraService = inject(CompraService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  
  textoActualizacion$!: Observable<string>;

  listaCronogramas: CronogramaResponse[]=[];

  ngOnInit(){
    this.cargarListaCronogramas();
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

  cargarListaCronogramas(){
    this.compraService.listarCronogramas().subscribe({
      next: (respuestaBackend) => {
        this.listaCronogramas=respuestaBackend;
        this.cdr.detectChanges();
        console.log('Lista cronogramas cargado correctamente',respuestaBackend);
      },
      error: (errorBackend) => {
        console.error('Estructura completa del error',errorBackend);
        
        const mensaje = errorBackend.error?.message || 'Error desconocido'
        this.toastService.error(mensaje);
      }
    })
  }
}

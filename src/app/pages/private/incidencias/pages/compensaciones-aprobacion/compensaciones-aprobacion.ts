import { Component, OnInit } from '@angular/core';
import { Observable, map, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TablaCompensaciones } from "../../components/tabla-compensaciones/tabla-compensaciones";

@Component({
  selector: 'app-compensaciones-aprobacion',
  imports: [TablaCompensaciones, AsyncPipe],
  templateUrl: './compensaciones-aprobacion.html',
  styleUrl: './compensaciones-aprobacion.scss',
})
export class CompensacionesAprobacion implements OnInit{
  textoActualizacion$!: Observable<string>;

  ngOnInit() {
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
}

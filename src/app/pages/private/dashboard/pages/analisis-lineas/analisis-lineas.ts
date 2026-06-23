import { Component, OnInit } from '@angular/core';
import { Observable, map, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SaturacionZonaChart } from "../../components/saturacion-zona-chart/saturacion-zona-chart";
import { ValorInmovilizadoChart } from "../../components/valor-inmovilizado-chart/valor-inmovilizado-chart";
import { NventasYStockXproductoChart } from "../../components/nventas-y-stock-xproducto-chart/nventas-y-stock-xproducto-chart";
import { TablaProductos } from "../../../inventario/components/tabla-productos/tabla-productos";

@Component({
  selector: 'app-analisis-lineas',
  imports: [SaturacionZonaChart, ValorInmovilizadoChart, NventasYStockXproductoChart, AsyncPipe, TablaProductos],
  templateUrl: './analisis-lineas.html',
  styleUrl: './analisis-lineas.scss',
})
export class AnalisisLineas implements OnInit{
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

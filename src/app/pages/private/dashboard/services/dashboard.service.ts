import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { SaturacionXZonaAlmacenResponse } from '../models/response/saturacion-xzona-almacen-response';

import { ValorInmovilizadoResponse } from '../models/response/valor-inmovilizado-response';

import { NVentasYStockXProducto } from '../models/response/nventas-y-stock-xproducto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  //GET SATURACION X ZONA ALMACEN
  listarSaturacionXZonaAlmacen(): Observable<SaturacionXZonaAlmacenResponse[]>{
    return this.http.get<SaturacionXZonaAlmacenResponse[]>(`${environment.url}/analisis/zonas-almacen/porcentaje-abastecimiento`);
  }

  //GET VALOR INMOVILIZADO PRODUCTO
  listarValorInmovilizadoProductos(): Observable<ValorInmovilizadoResponse[]>{
    return this.http.get<ValorInmovilizadoResponse[]>(`${environment.url}/analisis/productos-linea/valor-financiero`);
  }

  //GET NVENTAS Y STOCK POR PRODUCTO
  listarNVentasYStockXProducto(): Observable<NVentasYStockXProducto[]>{
    return this.http.get<NVentasYStockXProducto[]>(`${environment.url}/analisis/productos-linea/ventas-stock`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { ProductoStockResponse } from '../models/response/producto-stock-response';

import { ActualizacionInventarioRequest } from '../models/request/actualizacion-inventario-request';

import { ActualizacionProductoRequest } from '../models/request/actualizacion-producto-request';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private http = inject(HttpClient);

  //GET-LISTAR_STOCK_PRODUCTOS
  listarStockProductos(): Observable<ProductoStockResponse[]> {
    return this.http.get<ProductoStockResponse[]>(`${environment.url}/inventario/productos-linea`);
  }

  //POST-ACTUALIZAR_INVENTARIO
  actualizarInventario(request: ActualizacionInventarioRequest): Observable<string> {
    return this.http.post<string>(`${environment.url}/inventario/ordenes-compra/recepcion`,request);
  }

  //PATCH-ACTUALIZAR_ROTACION
  actualizarRotacion(id:number, request: ActualizacionProductoRequest): Observable<ActualizacionProductoRequest> {
    return this.http.patch<ActualizacionProductoRequest>(`${environment.url}/inventario/productos/${id}`, request);
  }
}

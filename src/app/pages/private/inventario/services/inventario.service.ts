import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ProductoStockResponse } from '../models/response/producto-stock-response';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private http = inject(HttpClient);

  //GET-LISTAR_STOCK_PRODUCTOS
  listarStockProductos(): Observable<ProductoStockResponse[]> {
    return this.http.get<ProductoStockResponse[]>(`${environment.url}/inventario/productos-linea`);
  }
}

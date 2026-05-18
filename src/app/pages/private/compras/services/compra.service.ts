import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ProductoCatalogoResponse } from '../models/response/producto-catalogo-response';

import { CronogramaCreateRequest } from '../models/request/cronograma-create-request';
import { CronogramaCreateResponse } from '../models/response/cronograma-create-response';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  private http = inject(HttpClient);
  
  //GET-LISTAR_PRODUCTOS_PROVEEDOR
  listarProductosProveedor(): Observable<ProductoCatalogoResponse[]> {
    return this.http.get<ProductoCatalogoResponse[]>(`${environment.url}/catalogo/productos-linea`);
  }

  //POST-GENERAR_CRONOGRAMA
  generarCronograma(request: CronogramaCreateRequest[]): Observable<CronogramaCreateResponse> {
    return this.http.post<CronogramaCreateResponse>(`${environment.url}/planificacion/cronogramas`,request);
  }
  
}

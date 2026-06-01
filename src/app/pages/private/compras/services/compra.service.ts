import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { ProductoCatalogoResponse } from '../models/response/producto-catalogo-response';

import { CronogramaCreateRequest } from '../models/request/cronograma-create-request';
import { CronogramaCreateResponse } from '../models/response/cronograma-create-response';

import { CronogramaResponse } from '../models/response/cronograma-response';

import { VistaPreviaOCResponse } from '../models/response/vista-previa-oc-response';

import { OrdenCompraRequest } from '../models/request/orden-compra-request';
import { OrdenCompraResponse } from '../models/response/orden-compra-response';

import { OrdenCompraListResponse } from '../models/response/orden-compra-list-response';

import { OrdenCompraSimpleListResponse } from '../models/response/orden-compra-simple-list-response';

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

  //GET-LISTAR_CRONOGRAMAS
  listarCronogramas(): Observable<CronogramaResponse[]> {
    return this.http.get<CronogramaResponse[]>(`${environment.url}/planificacion/cronogramas`);
  }

  //GET-LISTAR_VISTA_PREVIA_OC
  listarVistaPreviaOC(): Observable<VistaPreviaOCResponse[]> {
    return this.http.get<VistaPreviaOCResponse[]>(`${environment.url}/planificacion/cronogramas-proveedor`);
  }

  //POST-GENERAR_ORDEN_COMPRA
  generarOrdenCompra(request: OrdenCompraRequest): Observable<OrdenCompraResponse> {
    return this.http.post<OrdenCompraResponse>(`${environment.url}/compras/ordenes-compra`,request);
  }
  
  //GET-LISTAR_ORDENES_COMPRA
  listarOrdenesCompra(ordenId?: number): Observable<OrdenCompraListResponse[]> {
    let params = new HttpParams();

    if(ordenId != null){
      params = params.set('ordenId',ordenId);
    }

    return this.http.get<OrdenCompraListResponse[]>(`${environment.url}/compras/ordenes-compra`,{params});
  }

  //GET-LISTAR_ORDENES_COMPRA_SIMPLE
  listarOrdenesCompraSimple(): Observable<OrdenCompraSimpleListResponse[]> {
    return this.http.get<OrdenCompraSimpleListResponse[]>(`${environment.url}/compras/ordenes-compra/simple`);
  }
}

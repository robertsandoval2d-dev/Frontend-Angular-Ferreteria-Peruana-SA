import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { OrdenCompraResponse } from '../models/response/orden-compra-response';
import { RegistrarPenalidadRequest } from '../models/request/registrar-penalidad-request';

import { PedidoResponse } from '../models/response/pedido-response';

import { RegistrarCompensacionRequest } from '../models/request/registrar-compensacion-request';

import { CompensacionResponse } from '../models/response/compensacion-response';

@Injectable({
  providedIn: 'root',
})
export class IncidenciasService {
  private http = inject(HttpClient);
  private _refresh$ = new Subject<void>();

  //GET ORDENES COMPRA VENCIDAS
  listarOrdenesCompraVencidas(): Observable<OrdenCompraResponse[]>{
    return this.http.get<OrdenCompraResponse[]>(`${environment.url}/penalidades/ordenes-compra/vencidas`);
  }

 //POST CREAR PENALIDAD
  registrarPenalidad(datos: RegistrarPenalidadRequest): Observable<RegistrarPenalidadRequest> {
      return this.http.post<RegistrarPenalidadRequest>(`${environment.url}/penalidades/ordenes-compra`, datos);
    }

  //GET CLIENTES PEDIDOS VENCIDOS
  listarClientesPedidosVencidos(): Observable<PedidoResponse[]>{
    return this.http.get<PedidoResponse[]>(`${environment.url}/ventas/clientes/afectados-retraso`);
  }

  //POST REGISTRAR COMPENSACIÓN
  registrarCompensacion(request: RegistrarCompensacionRequest): Observable<string>{
    return this.http.post<string>(`${environment.url}/compensacion`,request);
  }

  //GET COMPENSACIONES PENDIENTES
  listarCompensacionesPendientes(): Observable<CompensacionResponse[]> {
    return this.http.get<CompensacionResponse[]>(`${environment.url}/compensacion/pendientes`);
  }

  //PATCH APROBAR COMPENSACION
  aprobarCompensacion(id:number): Observable<CompensacionResponse> {
    return this.http.patch<CompensacionResponse>(`${environment.url}/compensacion/aprobar/${id}`,{});
  } 

  //PATCH RECHAZAR COMPENSACION
  rechazarCompensacion(id:number): Observable<CompensacionResponse> {
    return this.http.patch<CompensacionResponse>(`${environment.url}/compensacion/rechazar/${id}`,{});
  } 


  get refresh$() {
    return this._refresh$;
  }

  notifyRefresh() {
    setTimeout(() => {
      this._refresh$.next();
    }, 100);
  }

}

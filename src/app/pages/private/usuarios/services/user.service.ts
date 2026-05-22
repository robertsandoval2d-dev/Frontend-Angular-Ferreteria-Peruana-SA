import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { environment } from '../../../../../environments/environment';

import { TrabajadorCreateRequest } from '../models/request/trabajador-create-request';
import { TrabajadorCreateResponse } from '../models/response/trabajador-create-response';

import { TrabajadorListResponse } from '../models/response/trabajador-list-response';
import { SucursalListResponse } from '../models/response/sucursal-list-response';

import { TrabajadorUpdateRequest } from '../models/request/trabajador-update-request';
import { TrabajadorUpdateResponse } from '../models/response/trabajador-update-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private _refresh$ = new Subject<void>();

  //POST-CREAR_TRABAJADOR
  registrarTrabajador(datos: TrabajadorCreateRequest): Observable<TrabajadorCreateResponse> {
    return this.http.post<TrabajadorCreateResponse>(`${environment.url}/trabajadores`, datos);
  }

  //GET-LISTAR_TRABAJADORES
  listarTrabajadores(): Observable<TrabajadorListResponse[]> {
    return this.http.get<TrabajadorListResponse[]>(`${environment.url}/trabajadores`);
  }
  
  //GET-SUCURSALES
  listarSucursales(): Observable<SucursalListResponse[]> {
    return this.http.get<SucursalListResponse[]>(`${environment.url}/trabajadores/sucursales`);
  }


  //PATCH-MODIFICAR_TRABAJADORES
  modificarTrabajador(id: number, datos: TrabajadorUpdateRequest): Observable<TrabajadorUpdateResponse> {
    return this.http.patch<TrabajadorUpdateResponse>(`${environment.url}/trabajadores/${id}`, datos);
  }

  //DELETE
  deshabilitarTrabajador(id:number){
    return this.http.delete(`${environment.url}/trabajadores/${id}`);
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

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { environment } from '../../../../environments/environment';

import { TrabajadorRequest } from '../../../private/usuarios/models/request/trabajador-request';
import { TrabajadorResponse } from '../../../private/usuarios/models/response/trabajador-response';
import { TrabajadorListResponse } from '../models/response/trabajador-list-response';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private _refresh$ = new Subject<void>();

  registrarTrabajador(datos: TrabajadorRequest): Observable<any> {
    return this.http.post(`${environment.url}/trabajadores`, datos);
  }

  listarTrabajadores(): Observable<TrabajadorListResponse[]> {
    return this.http.get<TrabajadorListResponse[]>(`${environment.url}/trabajadores`);
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

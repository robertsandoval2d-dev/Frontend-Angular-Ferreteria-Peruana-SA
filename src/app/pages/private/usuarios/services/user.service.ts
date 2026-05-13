import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { TrabajadorRequest } from '../../../private/usuarios/models/request/trabajador-request';
import { TrabajadorResponse } from '../../../private/usuarios/models/response/trabajador-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  registrarTrabajador(datos: TrabajadorRequest): Observable<any> {
    return this.http.post(`${environment.url}/trabajadores/registrar`, datos);
  }

}

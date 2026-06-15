import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { OrdenCompraResponse } from '../models/response/orden-compra-response';
import { RegistrarPenalidadRequest } from '../models/request/registrar-penalidad-request';

@Injectable({
  providedIn: 'root',
})
export class IncidenciasService {
  private http = inject(HttpClient);

  //GET ORDENES COMPRA VENCIDAS
  listarOrdenesCompraVencidas(): Observable<OrdenCompraResponse[]>{
    return this.http.get<OrdenCompraResponse[]>(`${environment.url}/penalidades/ordenes-compra/vencidas`);
  }


 //POST CREAR PENALIDAD
  registrarPenalidad(datos: RegistrarPenalidadRequest): Observable<RegistrarPenalidadRequest> {
      return this.http.post<RegistrarPenalidadRequest>(`${environment.url}/penalidades/ordenes-compra`, datos);
    }


}

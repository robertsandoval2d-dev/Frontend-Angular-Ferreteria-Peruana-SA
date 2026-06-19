import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import { MensajeListResponse } from '../models/response/mensaje-list-response';


@Injectable({
  providedIn: 'root',
})
export class MensajeriaService {

  private http = inject(HttpClient);

  //GET
  listarMensajes(): Observable<MensajeListResponse[]> {
    return this.http.get<MensajeListResponse[]>(`${environment.url}/mensajeria/mensajes`);
  }

}

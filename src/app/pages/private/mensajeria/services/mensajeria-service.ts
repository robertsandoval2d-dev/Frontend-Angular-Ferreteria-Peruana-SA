import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';


import { MensajeListResponse } from '../models/response/mensaje-list-response';
import { MensajeRequest } from '../models/request/mensaje-request';
import { MensajeViewRequest } from '../models/request/mensaje-view-request';


@Injectable({
  providedIn: 'root',
})
export class MensajeriaService {

  private http = inject(HttpClient);
  private _refresh$ = new Subject<void>();

  //GET
  listarMensajes(): Observable<MensajeListResponse[]> {
    return this.http.get<MensajeListResponse[]>(`${environment.url}/mensajeria/mensajes`);
  }

  //POST
  enviarMensaje(datos: MensajeRequest): Observable<MensajeRequest> {
    return this.http.post<MensajeRequest>(`${environment.url}/mensajeria/mensajes`, datos);
  }

  //PATCH
  marcarLeido(id:number, datos: MensajeViewRequest): Observable<MensajeViewRequest> {
    return this.http.patch<MensajeViewRequest>(`${environment.url}/mensajeria/mensajes/${id}`, datos);
  }

  get $refresh(){
    return this._refresh$;
  }

    notifyRefresh() {
    setTimeout(() => {
      this._refresh$.next();
    }, 100);
  }

}

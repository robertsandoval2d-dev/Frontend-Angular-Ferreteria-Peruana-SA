import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../models/request/login-request';
import { LoginResponse } from '../models/response/login-response';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageService = inject(StorageService);
  private _isLoggedIn = signal<boolean>(this.hasToken());
  isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient){}

  login(credenciales:LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.url}/auth/login`,credenciales,{withCredentials: true})
  }

  refreshToken(): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.url}/auth/refresh`,{},{withCredentials: true})
  }

  logoutSession(): Observable<void> {
    return this.http.post<void>(`${environment.url}/auth/logout`,{},{withCredentials: true});
  }

  private hasToken(): boolean{
    return !!this.storageService.getToken();
  }

  public setToken(Token: string){
    this.storageService.setToken(Token);
    this._isLoggedIn.set(true);
  }

  isAuthenticated(): boolean{
    return this.storageService.isAuthenticated();
  }

  logout() {
    this.storageService.removeToken();
    this.logoutSession().subscribe();
    this._isLoggedIn.set(false);
  }
}

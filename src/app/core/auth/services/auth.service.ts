import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../models/request/login-request';
import { LoginResponse } from '../models/response/login-response';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = signal<boolean>(this.hasToken());
  isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient){}

  login(credenciales:LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.url}/auth/login`,credenciales)
  }

  private hasToken(): boolean{
    return !!localStorage.getItem('token');
  }

  public setToken(Token: string){
    localStorage.setItem('token',Token);
    this._isLoggedIn.set(true);
  }

  isAuthenticated(): boolean{
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false);
  }
}

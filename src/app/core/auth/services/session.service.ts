import { Injectable } from '@angular/core';
import { UserSession } from '../models/user-session';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private getDecodedToken():any {
    const token = localStorage.getItem('token');
    if(token){
      //const decodedTokenString = atob(token.split('.')[1]);
      //return JSON.parse(decodedTokenString);
      return jwtDecode(token);
    }
    return null;
  }

  getInfoSession(): UserSession |null{
    const decodedToken = this.getDecodedToken();
    if(!decodedToken){
      return null;
    }
    return{
      username: decodedToken.sub,
      trabajadorId: decodedToken.trabajadorId,
      fullName: decodedToken.nombre,
      rol: decodedToken.rol
    };
  }

  getRole(): string{
    const session = this.getInfoSession();
    return session?.rol ??'';
  }
}

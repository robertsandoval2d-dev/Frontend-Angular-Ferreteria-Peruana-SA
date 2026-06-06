import { Injectable } from '@angular/core';
import { UserSession } from '../models/user-session';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private testerUserIndex = 3; // 0 , 1, 2, 3
  private fakeUsers = ['ADMIN', 'JEFE_DE_LINEA', 'ALMACENERO', 'ADMINISTRADOR_DE_TIENDA'];


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
      rol: decodedToken.rol,
      nombreLinea: decodedToken.linea,
    };
  }

  getRole(): string{
    if(environment.bypassAuth){
        return this.fakeUsers[this.testerUserIndex];
    }
    const session = this.getInfoSession();
    return session?.rol ??'';
  }

  getFullname(): string{
    const session = this.getInfoSession();
    return session?.fullName??'';
  }

  getNombreLinea(): string{
    const session = this.getInfoSession();
    return session?.nombreLinea??'';
  }
}

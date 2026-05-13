import { Component, OnInit, inject } from '@angular/core';
import { SessionService } from '../../../core/auth/services/session.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-header-private',
  imports: [],
  templateUrl: './header-private.html',
  styleUrl: './header-private.scss',
})
export class HeaderPrivate {
  private router = inject(Router);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);

  nombreUsuario: string = '';
  rolUsuario: string = '';

  ngOnInit() {
    // 3. Apenas nace el componente, leemos los datos del SessionService
    // (Asumiendo que tu compañero creó estos métodos)
    this.rolUsuario = this.sessionService.getRole(); 
    switch(this.rolUsuario){
      case 'JEFE_DE_LINEA':
        this.rolUsuario='JEFE DE LINEA';
        break;
      case 'ADMINISTRADOR_DE_TIENDA':
        this.rolUsuario = 'ADMINISTRADOR DE TIENDA';
        break;
      default:
        break;
    }
    // OJO: Tu servicio necesita un método para obtener el nombre o username
    this.nombreUsuario = this.sessionService.getFullname(); 
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

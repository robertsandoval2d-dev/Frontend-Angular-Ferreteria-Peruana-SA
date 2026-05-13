import { Component, OnInit, inject } from '@angular/core';
import { SessionService } from '../../../core/auth/services/session.service';

@Component({
  selector: 'app-header-private',
  imports: [],
  templateUrl: './header-private.html',
  styleUrl: './header-private.scss',
})
export class HeaderPrivate {
  private sessionService = inject(SessionService);

  nombreUsuario: string = '';
  rolUsuario: string = '';

  ngOnInit() {
    // 3. Apenas nace el componente, leemos los datos del SessionService
    // (Asumiendo que tu compañero creó estos métodos)
    this.rolUsuario = this.sessionService.getRole(); 
    
    // OJO: Tu servicio necesita un método para obtener el nombre o username
    this.nombreUsuario = this.sessionService.getFullname(); 
  }
}

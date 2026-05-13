import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from '../../../core/auth/services/session.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private sessionService = inject(SessionService);
  
  role: string = '';

  ngOnInit() {
    this.role = this.sessionService.getRole();
  }
  getNombreDelRol(): string {
    switch(this.role) {
      case 'ADMIN': return 'Administrador';
      case 'JEFE_DE_LINEA': return 'Jefe de Línea';
      case 'ADMINISTRADOR_DE_TIENDA': return 'Admin de Tienda';
      case 'ALMACENERO': return 'Almacenero';
      default: return 'Usuario';
    }
  }

  getRutaDashboard(): string {
    switch(this.role) {
      case 'ADMIN': return '/logistica/admin/dashboard';
      case 'JEFE_DE_LINEA': return '/logistica/jefelinea/dashboard';
      case 'ADMINISTRADOR_DE_TIENDA': return '/logistica/admin-tienda/dashboard';
      case 'ALMACENERO': return '/logistica/almacenero/dashboard';
      default: return '/logistica';
    }
  }
}

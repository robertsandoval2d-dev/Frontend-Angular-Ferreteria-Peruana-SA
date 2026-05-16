import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../auth/services/session.service';
import { environment } from '../../environments/environment';

export const roleGuard: CanActivateFn = (route) => {

   if(environment.bypassAuth){
    return true;
  }

  const sessionService = inject(SessionService);
  const router = inject(Router);

  // Roles permitidos definidos en la ruta
  const allowedRoles = route.data['roles'];

  // Rol del usuario actual
  const userRole = sessionService.getRole();

  // Validación
  if (allowedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
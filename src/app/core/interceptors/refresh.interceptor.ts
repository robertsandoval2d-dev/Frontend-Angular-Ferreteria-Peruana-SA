import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

export const refreshInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const authService = inject(AuthService);

  // Evitar bucles infinitos
  if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/logout') ||
    req.url.includes('/auth/refresh')
  ) {
    return next(req);
  }

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      // Solo intentar refresh ante 401
      if (error.status !== 401) {
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(

        switchMap((response) => {

          // Guardar nuevo access token
          authService.setToken(response.token);

          // Repetir petición original con el nuevo token
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.token}`
            }
          });

          return next(clonedRequest);
        }),

        catchError((refreshError: HttpErrorResponse) => {

          // Refresh token inválido o expirado
          authService.logout();

          return throwError(() => refreshError);
        })
      );
    })
  );
};
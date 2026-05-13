import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Buscamos el token en el almacenamiento del navegador
  const token = localStorage.getItem('token');

  // 2. Si el token existe, clonamos la petición y le inyectamos la cabecera
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // 3. Dejamos que la petición continúe su viaje hacia Spring Boot
    return next(authReq);
  }

  // Si no hay token (ej. está en la págin de Login), viaja sin cabeceras
  return next(req);
};
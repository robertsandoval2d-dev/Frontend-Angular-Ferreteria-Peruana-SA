import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; //ADDED


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])) //ADDED
  ]
};

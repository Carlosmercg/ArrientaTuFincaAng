import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importación clave
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // Habilita Fetch API (opcional pero recomendado)
      // withInterceptors([authInterceptor]) // Si necesitas interceptores
    ),
    // Otros providers...
  ]
};
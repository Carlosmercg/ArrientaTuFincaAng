import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importación clave

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    { provide: APP_BASE_HREF, useValue: '/' },
    provideHttpClient(withFetch()), // Habilita Fetch API (opcional pero recomendado)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

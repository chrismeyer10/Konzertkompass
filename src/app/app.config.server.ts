import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

/** Zusätzliche Provider für die Server-Side-Rendering-Konfiguration. */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

/** Zusammengeführte Konfiguration aus Browser- und Server-Teil. */
export const config = mergeApplicationConfig(appConfig, serverConfig);

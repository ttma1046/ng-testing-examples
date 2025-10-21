import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appProviders = [
  provideBrowserGlobalErrorListeners(),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
];

export const appConfig: ApplicationConfig = {
  providers: appProviders,
};

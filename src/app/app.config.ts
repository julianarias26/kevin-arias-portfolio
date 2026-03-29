// src/app/app.config.ts
import { ApplicationConfig, APP_INITIALIZER,
         provideZoneChangeDetection }      from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations }              from '@angular/platform-browser/animations';
import { provideHttpClient }              from '@angular/common/http';
import { routes }                         from './app.routes';
import { LanguageService }                from './core/services/language.service';

// Función que retorna una Promise —
// Angular espera a que se resuelva antes de arrancar la app
function initTranslations(langService: LanguageService): () => Promise<void> {
  return () => langService.loadTranslationsAsync();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideAnimations(),
    provideHttpClient(),

    // ← Espera a que las traducciones carguen antes de renderizar
    {
      provide:    APP_INITIALIZER,
      useFactory: initTranslations,
      deps:       [LanguageService],
      multi:      true,
    },
  ],
};
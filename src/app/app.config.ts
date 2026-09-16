import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { PhotoService } from './services/photo.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (photoService: PhotoService) => () => photoService.init(),
      deps: [PhotoService],
      multi: true,
    },
  ],
};

import { ApplicationConfig, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideContentDensity } from '@fundamental-ngx/core/content-density';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
import { FD_LANGUAGE_ENGLISH, FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideTheming({ defaultTheme: 'sap_horizon' }),
        themingInitializer(),
        provideContentDensity(),
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
};

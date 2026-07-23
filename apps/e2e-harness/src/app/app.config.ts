import { provideHttpClient, withXhr } from '@angular/common/http';
import { ApplicationConfig, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DynamicComponentService, RtlService } from '@fundamental-ngx/cdk/utils';
import { provideContentDensity } from '@fundamental-ngx/core/content-density';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
import { FD_LANGUAGE_ENGLISH, FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withXhr()),
        provideTheming({ defaultTheme: 'sap_horizon' }),
        themingInitializer(),
        provideContentDensity({ storage: 'url', storageKey: 'density' }),
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        },
        DialogService,
        DynamicComponentService,
        RtlService
    ]
};

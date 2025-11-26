import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';
import { provideContentDensity } from '@fundamental-ngx/core/content-density';
import { provideDialogService } from '@fundamental-ngx/core/dialog';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
import { DocsService, PACKAGE_JSON, Translations } from '@fundamental-ngx/docs/shared';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import packageJson from '../../../libs/core/package.json';
import { ROUTES as applicationRoutes } from './environments/app.routes';
import { translations } from './environments/translations';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideRouter(applicationRoutes, withPreloading(PreloadAllModules), withHashLocation()),
        provideTheming({ defaultTheme: 'sap_horizon' }),
        themingInitializer(),
        provideContentDensity({ storage: 'localStorage' }),
        provideDialogService(),
        DocsService,
        {
            provide: PACKAGE_JSON,
            useValue: packageJson
        },
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        },
        {
            provide: Translations,
            useFactory: translations
        },
        importProvidersFrom(MarkdownModule.forRoot({ loader: HttpClient }))
    ]
};

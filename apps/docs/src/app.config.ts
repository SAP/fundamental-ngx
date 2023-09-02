import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';
import { provideFdkClicked } from '@fundamental-ngx/cdk/utils';
import { provideContentDensity } from '@fundamental-ngx/core/content-density';
import { provideTheming } from '@fundamental-ngx/core/theming';
import { DocsService, LERNA_JSON, PACKAGE_JSON } from '@fundamental-ngx/docs/shared';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject } from 'rxjs';
import lernaJson from '../../../lerna.json';
import packageJson from '../../../package.json';
import { routes } from './app/app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideRouter(routes, withPreloading(PreloadAllModules), withHashLocation()),
        provideTheming({ defaultTheme: 'sap_horizon' }),
        provideContentDensity({ storage: 'localStorage' }),
        provideFdkClicked(),
        DocsService,
        {
            provide: PACKAGE_JSON,
            useValue: packageJson
        },
        {
            provide: LERNA_JSON,
            useValue: lernaJson
        },
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        },
        importProvidersFrom(MarkdownModule.forRoot({ loader: HttpClient }))
    ]
};

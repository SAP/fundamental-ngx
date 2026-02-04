import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';
import { provideContentDensity } from '@fundamental-ngx/core/content-density';
import { provideDialogService } from '@fundamental-ngx/core/dialog';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
import {
    CORE_PACKAGE_JSON,
    DocsService,
    PACKAGE_JSON,
    provideUnifiedDocsNavigation,
    Translations
} from '@fundamental-ngx/docs/shared';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { MarkdownModule } from 'ngx-markdown';
import { BehaviorSubject } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import packageJson from '../../../package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import corePackageJson from '../../../libs/core/package.json';
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
        provideUnifiedDocsNavigation({
            packages: {
                core: () => import('@fundamental-ngx/docs/core').then((m) => m.DOCS_DATA),
                platform: () => import('@fundamental-ngx/docs/platform').then((m) => m.DOCS_DATA),
                cdk: () => import('@fundamental-ngx/docs/cdk').then((m) => m.DOCS_DATA),
                btp: () => import('@fundamental-ngx/docs/btp').then((m) => m.DOCS_DATA),
                cx: () => import('@fundamental-ngx/docs/cx').then((m) => m.DOCS_DATA),
                i18n: () => import('@fundamental-ngx/docs/i18n').then((m) => m.DOCS_DATA),
                'ui5-webcomponents': () => import('@fundamental-ngx/docs/ui5-webcomponents').then((m) => m.DOCS_DATA),
                'ui5-webcomponents-ai': () =>
                    import('@fundamental-ngx/docs/ui5-webcomponents-ai').then((m) => m.DOCS_DATA),
                'ui5-webcomponents-fiori': () =>
                    import('@fundamental-ngx/docs/ui5-webcomponents-fiori').then((m) => m.DOCS_DATA)
            }
        }),
        DocsService,
        {
            provide: PACKAGE_JSON,
            useValue: packageJson
        },
        {
            provide: CORE_PACKAGE_JSON,
            useValue: corePackageJson
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

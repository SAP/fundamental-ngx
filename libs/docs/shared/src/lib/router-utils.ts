import { Routes } from '@angular/router';
import { FdLanguage } from '@fundamental-ngx/i18n';
import { ApiComponent } from './core-helpers/api/api.component';
import { getI18nKey, I18nDocsComponent } from './core-helpers/i18n-docs/i18n-docs.component';
import { ApiDocsService } from './services/api-docs.service';
import { currentComponentProvider } from './tokens/current-component.token';

interface RouterConfiguration<ApiFiles extends Record<string, string[]> = Record<string, string[]>> {
    apiFiles: ApiFiles;
    apiFilesKey: keyof ApiFiles;
    i18nKey?: keyof FdLanguage;
}

export function configureRoutes(
    configuration: RouterConfiguration
): (routesImport: { ROUTES: Routes; LIBRARY_NAME: string }) => Routes {
    return ({ ROUTES: routes, LIBRARY_NAME: libraryName }) => {
        const primaryRoute = routes.find((route) => route.data && route.data.primary);
        if (primaryRoute) {
            primaryRoute.providers = [...(primaryRoute.providers || []), currentComponentProvider(libraryName)];
            primaryRoute.children = [
                ...(primaryRoute.children || []),
                {
                    path: 'api',
                    component: ApiComponent,
                    data: { content: configuration.apiFiles[configuration.apiFilesKey] },
                    providers: [ApiDocsService]
                },
                ...(configuration.i18nKey
                    ? ([
                          { path: 'i18n', data: getI18nKey(configuration.i18nKey), component: I18nDocsComponent }
                      ] as Routes)
                    : [])
            ];
        }
        return routes;
    };
}

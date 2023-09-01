import { Routes } from '@angular/router';
import { FdLanguage } from '@fundamental-ngx/i18n';
import { ApiDocsService } from './services/api-docs.service';
import { currentComponentProvider } from './tokens/current-component.token';
import { hasI18nProvider } from './tokens/has-i18n.token';

export function configureRoutes<ApiFiles = Record<string, string[]>>(
    apiFiles: ApiFiles
): (routesImport: {
    ROUTES: Routes;
    LIBRARY_NAME: string;
    API_FILE_KEY?: keyof ApiFiles;
    I18N_KEY?: keyof FdLanguage;
}) => Routes {
    return ({ ROUTES: routes, LIBRARY_NAME: libraryName, API_FILE_KEY: apiFilesKey, I18N_KEY: i18nKey }) => {
        const primaryRoute = routes.find((route) => route.data && route.data.primary);
        if (primaryRoute) {
            primaryRoute.providers = primaryRoute.providers || [];
            primaryRoute.providers.push(currentComponentProvider(libraryName));
            if (i18nKey) {
                primaryRoute.providers.push(hasI18nProvider(true));
            }
            primaryRoute.children = primaryRoute.children || [];
            if (apiFilesKey) {
                primaryRoute.children.push({
                    path: 'api',
                    loadComponent: () => import('./core-helpers/api/api.component').then((m) => m.ApiComponent),
                    data: { content: apiFiles[apiFilesKey] },
                    providers: [ApiDocsService]
                });
            }
            if (i18nKey) {
                primaryRoute.children.push({
                    path: 'i18n',
                    data: { i18nKey },
                    loadComponent: () =>
                        import('./core-helpers/i18n-docs/i18n-docs.component').then((m) => m.I18nDocsComponent)
                });
            }
        }
        return routes;
    };
}

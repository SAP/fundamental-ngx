import { Routes } from '@angular/router';
import { FdLanguage } from '@fundamental-ngx/i18n';
import { ApiComponent } from './core-helpers/api/api.component';
import { getI18nKey, I18nDocsComponent } from './core-helpers/i18n-docs/i18n-docs.component';
import { ApiDocsService } from './services/api-docs.service';
import { currentComponentProvider } from './tokens/current-component.token';

export function configureRoutes<ApiFiles extends Record<string, string[]> = Record<string, string[]>>(
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
            primaryRoute.providers = [...(primaryRoute.providers || []), currentComponentProvider(libraryName)];
            primaryRoute.children = primaryRoute.children || [];
            if (apiFilesKey) {
                primaryRoute.children.push({
                    path: 'api',
                    component: ApiComponent,
                    data: { content: apiFiles[apiFilesKey] },
                    providers: [ApiDocsService]
                });
            }
            if (i18nKey) {
                primaryRoute.children.push({ path: 'i18n', data: getI18nKey(i18nKey), component: I18nDocsComponent });
            }
        }
        return routes;
    };
}

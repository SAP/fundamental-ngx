import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dynamic-page-header/dynamic-page-docs-header.component').then(
                (c) => c.DynamicPageDocsHeaderComponent
            ),
        providers: [currentComponentProvider('dynamic-page'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./dynamic-page-docs.component').then((c) => c.DynamicPageDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicPage } }
        ]
    }
];

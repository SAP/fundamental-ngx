import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

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

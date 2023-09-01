import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-page-header/object-page-docs-header.component').then(
                (c) => c.ObjectPageDocsHeaderComponent
            ),
        providers: [currentComponentProvider('object-page'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./object-page-docs.component').then((c) => c.ObjectPageDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicPage } }
        ]
    }
];

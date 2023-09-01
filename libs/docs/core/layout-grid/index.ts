import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout-grid-docs-header/layout-grid-docs-header.component').then(
                (c) => c.LayoutGridDocsHeaderComponent
            ),
        providers: [currentComponentProvider('layout-grid'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout-grid-docs.component').then((c) => c.LayoutGridDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.layoutGrid } }
        ]
    }
];

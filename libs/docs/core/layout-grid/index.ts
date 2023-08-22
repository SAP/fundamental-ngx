import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

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

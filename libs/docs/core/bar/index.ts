import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./bar-header/bar-header.component').then((c) => c.BarHeaderComponent),
        providers: [currentComponentProvider('bar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./bar-docs.component').then((c) => c.BarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.bar } }
        ]
    }
];

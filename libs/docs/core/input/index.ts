import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./input-header/input-header.component').then((c) => c.InputHeaderComponent),
        providers: [currentComponentProvider('input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./input-docs.component').then((c) => c.InputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
        ]
    }
];

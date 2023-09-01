import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./input-group-header/input-group-header.component').then((c) => c.InputGroupHeaderComponent),
        providers: [currentComponentProvider('input-group'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./input-group-docs.component').then((c) => c.InputGroupDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
        ]
    }
];

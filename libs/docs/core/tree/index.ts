import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./tree-header/tree-header.component').then((c) => c.TreeHeaderComponent),
        providers: [currentComponentProvider('tree'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./tree-docs.component').then((c) => c.TreeDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tree } }
        ]
    }
];

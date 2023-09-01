import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list-header/list-header.component').then((c) => c.ListHeaderComponent),
        providers: [currentComponentProvider('list'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./list-docs.component').then((c) => c.ListDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

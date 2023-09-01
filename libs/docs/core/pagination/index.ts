import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pagination-header/pagination-header.component').then((c) => c.PaginationHeaderComponent),
        providers: [currentComponentProvider('pagination'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./pagination-docs.component').then((c) => c.PaginationDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.pagination } }
        ]
    }
];

import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./icon-header/icon-header.component').then((c) => c.IconHeaderComponent),
        providers: [currentComponentProvider('icon'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./icon-docs.component').then((c) => c.IconDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.icon } }
        ]
    }
];

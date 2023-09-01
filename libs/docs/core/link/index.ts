import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./link-header/link-header.component').then((c) => c.LinkHeaderComponent),
        providers: [currentComponentProvider('link'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./link-docs.component').then((c) => c.LinkDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.link } }
        ]
    }
];

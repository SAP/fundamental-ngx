import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./text-header/text-header.component').then((c) => c.TextHeaderComponent),
        providers: [currentComponentProvider('text'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./text-docs.component').then((c) => c.TextDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.text } }
        ]
    }
];

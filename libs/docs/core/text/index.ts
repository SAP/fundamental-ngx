import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

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

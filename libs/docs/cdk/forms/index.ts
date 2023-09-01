import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./forms-header/forms-header.component').then((c) => c.FormsHeaderComponent),
        providers: [currentComponentProvider('forms'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./forms-docs.component').then((c) => c.FormsDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.forms } }
        ]
    }
];

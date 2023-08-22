import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./radio-header/radio-header.component').then((c) => c.RadioHeaderComponent),
        providers: [currentComponentProvider('radio'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./radio-docs.component').then((c) => c.RadioDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
        ]
    }
];

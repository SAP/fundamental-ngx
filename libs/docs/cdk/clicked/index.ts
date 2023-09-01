import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./clicked-header/clicked-header.component').then((c) => c.ClickedHeaderComponent),
        providers: [currentComponentProvider('clicked'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./clicked-docs.component').then((c) => c.ClickedDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.clicked } }
        ]
    }
];

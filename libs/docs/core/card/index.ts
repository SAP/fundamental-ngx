import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./card-header/card-header.component').then((c) => c.CardHeaderComponent),
        providers: [currentComponentProvider('card'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./card-docs.component').then((c) => c.CardDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.card } }
        ]
    }
];

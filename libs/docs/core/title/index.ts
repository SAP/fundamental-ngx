import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./title-header/title-header.component').then((c) => c.TitleHeaderComponent),
        providers: [currentComponentProvider('title'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./title-docs.component').then((c) => c.TitleDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.title } }
        ]
    }
];

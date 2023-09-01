import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

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

import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./menu-header/menu-header.component').then((c) => c.MenuHeaderComponent),
        providers: [currentComponentProvider('menu'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./menu-docs.component').then((c) => c.MenuDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
        ]
    }
];

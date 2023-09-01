import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./switch-header/switch-header.component').then((c) => c.SwitchHeaderComponent),
        providers: [currentComponentProvider('switch'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./switch-docs.component').then((c) => c.SwitchDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.switch } }
        ]
    }
];

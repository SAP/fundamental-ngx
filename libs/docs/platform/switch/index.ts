import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

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

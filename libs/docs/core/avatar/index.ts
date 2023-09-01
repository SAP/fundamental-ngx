import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./avatar-header/avatar-header.component').then((c) => c.AvatarHeaderComponent),
        providers: [currentComponentProvider('avatar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./avatar-docs.component').then((c) => c.AvatarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.avatar } }
        ]
    }
];

import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./avatar-group-header/avatar-group-header.component').then((c) => c.AvatarGroupHeaderComponent),
        providers: [currentComponentProvider('avatar-group'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./avatar-group-docs.component').then((c) => c.AvatarGroupDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.avatarGroup } }
        ]
    }
];

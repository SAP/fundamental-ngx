import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-menu-header/platform-menu-header.component').then((c) => c.PlatformMenuHeaderComponent),
        providers: [currentComponentProvider('menu'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-menu-docs.component').then((c) => c.PlatformMenuDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
        ]
    }
];

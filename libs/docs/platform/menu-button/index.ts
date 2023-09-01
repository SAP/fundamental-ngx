import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-menu-button-header/platform-menu-button-header.component').then(
                (c) => c.PlatformMenuButtonHeaderComponent
            ),
        providers: [currentComponentProvider('menu-button'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-menu-button-docs.component').then((c) => c.PlatformMenuButtonDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menuButton } }
        ]
    }
];

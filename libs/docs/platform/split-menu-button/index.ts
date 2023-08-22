import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-split-menu-button-header/platform-split-menu-button-header.component').then(
                (c) => c.PlatformDocsSplitMenuButtonHeaderComponent
            ),
        providers: [currentComponentProvider('split-menu-button'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-split-menu-button.component').then((c) => c.PlatformDocsSplitMenuButtonComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.splitMenuButton } }
        ]
    }
];

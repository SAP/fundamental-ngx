import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-icon-tab-bar-header/platform-icon-tab-bar-header.component').then(
                (c) => c.PlatformIconTabBarHeaderComponent
            ),
        providers: [currentComponentProvider('icon-tab-bar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-icon-tab-bar-docs.component').then((c) => c.PlatformIconTabBarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.iconTabBar } }
        ]
    }
];

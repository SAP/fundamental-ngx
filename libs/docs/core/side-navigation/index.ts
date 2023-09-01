import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./side-navigation-header/side-navigation-header.component').then(
                (c) => c.SideNavigationHeaderComponent
            ),
        providers: [currentComponentProvider('side-navigation'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./side-navigation-docs.component').then((c) => c.SideNavigationDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.sideNavigation } }
        ]
    }
];

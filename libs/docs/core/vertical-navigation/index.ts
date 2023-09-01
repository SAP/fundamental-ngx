import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./vertical-navigation-header/vertical-navigation-header.component').then(
                (c) => c.VerticalNavigationHeaderComponent
            ),
        providers: [currentComponentProvider('vertical-navigation'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./vertical-navigation-docs.component').then((c) => c.VerticalNavigationDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.verticalNavigation } }
        ]
    }
];

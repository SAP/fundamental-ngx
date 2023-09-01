import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-dynamic-page-header/platform-dynamic-page-header.component').then(
                (c) => c.PlatformDynamicPageHeaderComponent
            ),
        providers: [currentComponentProvider('dynamic-page'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-dynamic-page-docs.component').then((c) => c.PlatformDynamicPageDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicPage } }
        ]
    }
];

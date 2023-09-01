import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-page-footer-header/platform-page-footer-header.component').then(
                (c) => c.PlatformPageFooterHeaderComponent
            ),
        providers: [currentComponentProvider('page-footer'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-page-footer-docs.component').then((c) => c.PlatformPageFooterDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.footer } }
        ]
    }
];

import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-object-status-header/platform-object-status-header.component').then(
                (c) => c.PlatformObjectStatusHeaderComponent
            ),
        providers: [currentComponentProvider('object-status'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-status-docs.component').then((c) => c.PlatformObjectStatusDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectStatus } }
        ]
    }
];

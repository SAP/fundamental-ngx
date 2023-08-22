import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-input-header/platform-input-header.component').then(
                (c) => c.PlatformInputHeaderComponent
            ),
        providers: [currentComponentProvider('input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-input-docs.component').then((c) => c.PlatformInputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.input } }
        ]
    }
];

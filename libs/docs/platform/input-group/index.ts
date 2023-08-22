import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-input-group-header/platform-input-group-header.component').then(
                (c) => c.PlatformInputGroupHeaderComponent
            ),
        providers: [currentComponentProvider('input-group'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-input-group-docs.component').then((c) => c.PlatformInputGroupDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
        ]
    }
];

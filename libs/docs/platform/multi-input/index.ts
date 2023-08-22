import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-multi-input-header/platform-multi-input-header.component').then(
                (c) => c.PlatformMultiInputHeaderComponent
            ),
        providers: [currentComponentProvider('multi-input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-multi-input-docs.component').then((c) => c.PlatformMultiInputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiInput } }
        ]
    }
];

import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-select-header/platform-select-header.component').then(
                (c) => c.PlatformSelectHeaderComponent
            ),
        providers: [currentComponentProvider('select'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-select-docs.component').then((c) => c.PlatformSelectDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];

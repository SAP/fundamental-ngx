import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./content-density-header/content-density-header.component').then(
                (c) => c.ContentDensityHeaderComponent
            ),
        providers: [currentComponentProvider('content-density'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./content-density-docs.component').then((c) => c.ContentDensityDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.contentDensity } }
        ]
    }
];

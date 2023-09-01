import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dynamic-side-content-header/dynamic-side-content-header.component').then(
                (c) => c.DynamicSideContentHeaderComponent
            ),
        providers: [currentComponentProvider('dynamic-side-content'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dynamic-side-content-docs.component').then((c) => c.DynamicSideContentDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicSideContent } }
        ]
    }
];

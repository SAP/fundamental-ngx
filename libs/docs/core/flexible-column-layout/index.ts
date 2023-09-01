import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./flexible-column-layout-docs-header/flexible-column-layout-docs-header.component').then(
                (c) => c.FlexibleColumnLayoutDocsHeaderComponent
            ),
        providers: [currentComponentProvider('flexible-column-layout'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./flexible-column-layout-docs.component').then((c) => c.FlexibleColumnLayoutDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.flexibleColumnLayout } }
        ]
    }
];

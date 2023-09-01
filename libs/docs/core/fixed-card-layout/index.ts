import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./fixed-card-layout-docs-header/fixed-card-layout-docs-header.component').then(
                (c) => c.FixedCardLayoutDocsHeaderComponent
            ),
        providers: [currentComponentProvider('fixed-card-layout'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./fixed-card-layout-docs.component').then((c) => c.FixedCardLayoutDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.fixedCardLayout } }
        ]
    }
];

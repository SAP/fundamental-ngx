import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./facet-header/facet-docs-header.component').then((c) => c.FacetDocsHeaderComponent),
        providers: [currentComponentProvider('facets'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./facets-docs.component').then((c) => c.FacetsDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.facets } }
        ]
    }
];

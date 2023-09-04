import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./facet-header/facet-docs-header.component').then((c) => c.FacetDocsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./facets-docs.component').then((c) => c.FacetsDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'facets';
export const API_FILE_KEY = 'facets';

import { Routes } from '@angular/router';
import { FacetDocsHeaderComponent } from './facet-header/facet-docs-header.component';
import { FacetsDocsComponent } from './facets-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FacetDocsHeaderComponent,
        children: [
            {
                path: '',
                component: FacetsDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'facets';
export const API_FILE_KEY = 'facets';

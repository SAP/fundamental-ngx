import { Routes } from '@angular/router';
import { SearchHeader } from './header/search-header';
import { SearchDocs } from './search-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: SearchHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: SearchDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'search';
export const API_FILE_KEY = 'search';

export * from './examples/actions-sample';
export * from './examples/advanced-filtering-sample';
export * from './examples/byline-items-sample';
export * from './examples/custom-max-height-sample';
export * from './examples/loading-sample';
export * from './examples/scopes-sample';
export * from './examples/show-more-sample';
export * from './examples/suggestions-sample';
export * from './header/search-header';
export * from './search-docs';

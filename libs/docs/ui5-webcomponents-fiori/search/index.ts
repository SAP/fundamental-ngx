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

import { Routes } from '@angular/router';
import { PlatformSearchFieldDocsComponent } from './platform-search-field-docs.component';
import { PlatformSearchFieldHeaderComponent } from './platform-search-field-header/platform-search-field-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformSearchFieldHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformSearchFieldDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'search-field';
export const API_FILE_KEY = 'searchField';
export const I18N_KEY = 'platformSearchField';

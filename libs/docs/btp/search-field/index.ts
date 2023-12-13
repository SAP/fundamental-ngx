import { Routes } from '@angular/router';
import { SearchFieldDocsComponent } from './search-field-docs.component';
import { SearchFieldHeaderComponent } from './search-field-header/search-field-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SearchFieldHeaderComponent,
        children: [
            {
                path: '',
                component: SearchFieldDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'search-field';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/btp/search-field';
export const API_FILE_KEY = 'searchField';

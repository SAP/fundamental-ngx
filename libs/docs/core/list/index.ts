import { Routes } from '@angular/router';
import { ListDocsComponent } from './list-docs.component';
import { ListHeaderComponent } from './list-header/list-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ListHeaderComponent,
        children: [
            {
                path: '',
                component: ListDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'list';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/list';
export const API_FILE_KEY = 'list';

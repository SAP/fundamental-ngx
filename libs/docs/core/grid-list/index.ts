import { Routes } from '@angular/router';
import { GridListDocsComponent } from './grid-list-docs.component';
import { GridListHeaderComponent } from './grid-list-header/grid-list-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: GridListHeaderComponent,
        children: [
            {
                path: '',
                component: GridListDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'grid-list';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/grid-list';
export const API_FILE_KEY = 'gridList';
export const I18N_KEY = 'coreGridList';

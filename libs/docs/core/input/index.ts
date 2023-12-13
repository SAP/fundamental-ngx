import { Routes } from '@angular/router';
import { InputDocsComponent } from './input-docs.component';
import { InputHeaderComponent } from './input-header/input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: InputHeaderComponent,
        children: [
            {
                path: '',
                component: InputDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/form';
export const API_FILE_KEY = 'inputGroup';

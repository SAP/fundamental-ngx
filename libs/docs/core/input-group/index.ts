import { Routes } from '@angular/router';
import { InputGroupDocsComponent } from './input-group-docs.component';
import { InputGroupHeaderComponent } from './input-group-header/input-group-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: InputGroupHeaderComponent,
        children: [
            {
                path: '',
                component: InputGroupDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input-group';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/input-group';
export const API_FILE_KEY = 'inputGroup';

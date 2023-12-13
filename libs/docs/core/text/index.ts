import { Routes } from '@angular/router';
import { TextDocsComponent } from './text-docs.component';
import { TextHeaderComponent } from './text-header/text-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TextHeaderComponent,
        children: [
            {
                path: '',
                component: TextDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'text';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/text';
export const API_FILE_KEY = 'text';
export const I18N_KEY = 'coreText';

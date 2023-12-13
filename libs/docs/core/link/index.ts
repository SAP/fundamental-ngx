import { Routes } from '@angular/router';
import { LinkDocsComponent } from './link-docs.component';
import { LinkHeaderComponent } from './link-header/link-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LinkHeaderComponent,
        children: [
            {
                path: '',
                component: LinkDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'link';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/link';
export const API_FILE_KEY = 'link';

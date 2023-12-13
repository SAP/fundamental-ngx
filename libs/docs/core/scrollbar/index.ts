import { Routes } from '@angular/router';
import { ScrollbarDocsComponent } from './scrollbar-docs.component';
import { ScrollbarHeaderComponent } from './scrollbar-header/scrollbar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ScrollbarHeaderComponent,
        children: [
            {
                path: '',
                component: ScrollbarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'scrollbar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/scrollbar';
export const API_FILE_KEY = 'scrollbar';

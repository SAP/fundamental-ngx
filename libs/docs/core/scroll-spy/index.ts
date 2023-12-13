import { Routes } from '@angular/router';
import { ScrollSpyDocsComponent } from './scroll-spy-docs.component';
import { ScrollSpyHeaderComponent } from './scroll-spy-header/scroll-spy-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ScrollSpyHeaderComponent,
        children: [
            {
                path: '',
                component: ScrollSpyDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'scroll-spy';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/scroll-spy';
export const API_FILE_KEY = 'scrollSpy';

import { Routes } from '@angular/router';
import { PopoverDocsComponent } from './popover-docs.component';
import { PopoverHeaderComponent } from './popover-header/popover-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PopoverHeaderComponent,
        children: [
            {
                path: '',
                component: PopoverDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'popover';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/popover';
export const API_FILE_KEY = 'popover';

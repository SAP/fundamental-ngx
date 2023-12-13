import { Routes } from '@angular/router';
import { TimeDocsComponent } from './time-docs.component';
import { TimeHeaderComponent } from './time-header/time-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TimeHeaderComponent,
        children: [
            {
                path: '',
                component: TimeDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'time';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/time';
export const API_FILE_KEY = 'time';
export const I18N_KEY = 'coreTime';

import { Routes } from '@angular/router';
import { ActionBarDocsComponent } from './action-bar-docs.component';
import { ActionBarHeaderComponent } from './action-bar-header/action-bar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ActionBarHeaderComponent,
        children: [
            {
                path: '',
                component: ActionBarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-bar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/action-bar';
export const API_FILE_KEY = 'actionBar';

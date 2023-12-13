import { Routes } from '@angular/router';
import { TabbableDocsComponent } from './tabbable-docs.component';
import { TabbableHeaderComponent } from './tabbable-header/tabbable-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TabbableHeaderComponent,
        children: [
            {
                path: '',
                component: TabbableDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tabbable';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/cdk/utils';
export const API_FILE_KEY = 'tabbable';

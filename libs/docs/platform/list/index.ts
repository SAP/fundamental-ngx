import { Routes } from '@angular/router';
import { PlatformListDocsComponent } from './platform-list-docs.component';
import { PlatformListHeaderComponent } from './platform-list-header/platform-list-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformListHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformListDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'list';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/list';
export const API_FILE_KEY = 'list';
export const I18N_KEY = 'platformList';

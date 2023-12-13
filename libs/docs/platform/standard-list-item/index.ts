import { Routes } from '@angular/router';
import { PlatformStandardListItemDocsComponent } from './platform-standard-list-item-docs.component';
import { PlatformStandardListItemHeaderComponent } from './platform-standard-list-item-header/platform-standard-list-item-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformStandardListItemHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformStandardListItemDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'standard-list-item';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/list';
export const API_FILE_KEY = 'standardlistitem';
export const I18N_KEY = 'platformStandardListItem';

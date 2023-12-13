import { Routes } from '@angular/router';
import { PlatformSmartFilterBarDocsComponent } from './platform-smart-filter-bar-docs.component';
import { PlatformSmartFilterBarHeaderComponent } from './platform-smart-filter-bar-header/platform-smart-filter-bar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformSmartFilterBarHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformSmartFilterBarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'smart-filter-bar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/smart-filter-bar';
export const API_FILE_KEY = 'smartFilterBar';
export const I18N_KEY = 'platformSmartFilterBar';

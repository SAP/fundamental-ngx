import { Routes } from '@angular/router';
import { PlatformDynamicPageDocsComponent } from './platform-dynamic-page-docs.component';
import { PlatformDynamicPageHeaderComponent } from './platform-dynamic-page-header/platform-dynamic-page-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDynamicPageHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformDynamicPageDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dynamic-page';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/dynamic-page';
export const API_FILE_KEY = 'dynamicPage';
export const I18N_KEY = 'coreDynamicPage';

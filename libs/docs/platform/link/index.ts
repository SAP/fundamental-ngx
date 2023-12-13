import { Routes } from '@angular/router';
import { PlatformLinkDocsComponent } from './platform-link-docs.component';
import { PlatformLinkHeaderComponent } from './platform-link-header/platform-link-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformLinkHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformLinkDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'link';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/link';
export const API_FILE_KEY = 'link';
export const I18N_KEY = 'platformLink';

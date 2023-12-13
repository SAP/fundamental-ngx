import { Routes } from '@angular/router';
import { PlatformFeedInputDocsComponent } from './platform-feed-input-docs.component';
import { PlatformFeedInputHeaderComponent } from './platform-feed-input-header/platform-feed-input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformFeedInputHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformFeedInputDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'feed-input';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/feed-input';
export const API_FILE_KEY = 'feedInput';
export const I18N_KEY = 'platformFeedInput';

import { Routes } from '@angular/router';
import { FeedInputDocsComponent } from './feed-input-docs.component';
import { FeedInputHeaderComponent } from './feed-input-header/feed-input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FeedInputHeaderComponent,
        children: [
            {
                path: '',
                component: FeedInputDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'feed-input';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/feed-input';
export const API_FILE_KEY = 'feedInput';

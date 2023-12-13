import { Routes } from '@angular/router';
import { FeedListItemDocsComponent } from './feed-list-item-docs.component';
import { FeedListItemHeaderComponent } from './feed-list-item-header/feed-list-item-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FeedListItemHeaderComponent,
        children: [
            {
                path: '',
                component: FeedListItemDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'feed-list-item';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/feed-list-item';
export const API_FILE_KEY = 'feedListItem';
export const I18N_KEY = 'coreFeedListItem';

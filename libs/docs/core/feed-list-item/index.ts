import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./feed-list-item-header/feed-list-item-header.component').then(
                (c) => c.FeedListItemHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./feed-list-item-docs.component').then((c) => c.FeedListItemDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'feed-list-item';
export const API_FILE_KEY = 'feedListItem';
export const I18N_KEY = 'coreFeedListItem';

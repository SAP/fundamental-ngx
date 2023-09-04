import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./feed-input-header/feed-input-header.component').then((c) => c.FeedInputHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./feed-input-docs.component').then((c) => c.FeedInputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'feed-input';
export const API_FILE_KEY = 'feedInput';

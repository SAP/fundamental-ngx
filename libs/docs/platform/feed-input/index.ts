import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-feed-input-header/platform-feed-input-header.component').then(
                (c) => c.PlatformFeedInputHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-feed-input-docs.component').then((c) => c.PlatformFeedInputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'feed-input';
export const API_FILE_KEY = 'feedInput';

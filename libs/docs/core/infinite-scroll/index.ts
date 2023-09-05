import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./infinite-scroll-header/infinite-scroll-header.component').then(
                (c) => c.InfiniteScrollHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./infinite-scroll-docs.component').then((c) => c.InfiniteScrollDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'infinite-scroll';
export const API_FILE_KEY = 'infiniteScroll';

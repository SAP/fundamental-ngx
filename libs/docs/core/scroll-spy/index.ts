import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./scroll-spy-header/scroll-spy-header.component').then((c) => c.ScrollSpyHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./scroll-spy-docs.component').then((c) => c.ScrollSpyDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'scroll-spy';
export const API_FILE_KEY = 'scrollSpy';

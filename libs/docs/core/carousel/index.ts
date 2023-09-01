import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./carousel-header/carousel-header.component').then((c) => c.CarouselHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./carousel-docs.component').then((c) => c.CarouselDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'carousel';
export const API_FILE_KEY = 'carousel';

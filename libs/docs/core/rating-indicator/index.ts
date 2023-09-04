import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./rating-indicator-docs-header/rating-indicator-docs-header.component').then(
                (c) => c.RatingIndicatorDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./rating-indicator-docs.component').then((c) => c.RatingIndicatorDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'rating-indicator';
export const API_FILE_KEY = 'ratingIndicator';

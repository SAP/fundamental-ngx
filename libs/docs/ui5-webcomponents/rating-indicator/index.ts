import { Routes } from '@angular/router';
import { RatingIndicatorHeader } from './header/rating-indicator-header';
import { RatingIndicatorDocs } from './rating-indicator-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: RatingIndicatorHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: RatingIndicatorDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'rating-indicator';
export const API_FILE_KEY = 'ratingIndicator';

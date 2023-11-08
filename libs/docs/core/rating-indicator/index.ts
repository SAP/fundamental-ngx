import { Routes } from '@angular/router';
import { RatingIndicatorDocsHeaderComponent } from './rating-indicator-docs-header/rating-indicator-docs-header.component';
import { RatingIndicatorDocsComponent } from './rating-indicator-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: RatingIndicatorDocsHeaderComponent,
        children: [
            {
                path: '',
                component: RatingIndicatorDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'rating-indicator';
export const API_FILE_KEY = 'ratingIndicator';

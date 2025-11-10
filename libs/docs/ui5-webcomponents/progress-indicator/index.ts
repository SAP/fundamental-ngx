import { Routes } from '@angular/router';
import { ProgressIndicatorHeader } from './header/progress-indicator-header';
import { ProgressIndicatorDocs } from './progress-indicator-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ProgressIndicatorHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ProgressIndicatorDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'progress-indicator';
export const API_FILE_KEY = 'progressIndicator';

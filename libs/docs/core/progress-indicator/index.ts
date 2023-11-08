import { Routes } from '@angular/router';
import { ProgressIndicatorDocsComponent } from './progress-indicator-docs.component';
import { ProgressIndicatorHeaderComponent } from './progress-indicator-header/progress-indicator-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ProgressIndicatorHeaderComponent,
        children: [
            {
                path: '',
                component: ProgressIndicatorDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'progress-indicator';
export const API_FILE_KEY = 'progressIndicator';

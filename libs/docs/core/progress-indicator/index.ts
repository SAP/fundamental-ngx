import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./progress-indicator-header/progress-indicator-header.component').then(
                (c) => c.ProgressIndicatorHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./progress-indicator-docs.component').then((c) => c.ProgressIndicatorDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'progress-indicator';
export const API_FILE_KEY = 'progressIndicator';

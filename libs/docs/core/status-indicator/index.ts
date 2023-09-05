import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./status-indicator-header/status-indicator-header.component').then(
                (c) => c.StatusIndicatorHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./status-indicator-docs.component').then((c) => c.StatusIndicatorDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'status-indicator';
export const API_FILE_KEY = 'statusIndicator';

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./busy-indicator-header/busy-indicator-header.component').then(
                (c) => c.BusyIndicatorHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./busy-indicator-docs.component').then((c) => c.BusyIndicatorDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'busy-indicator';
export const API_FILE_KEY = 'busyIndicator';

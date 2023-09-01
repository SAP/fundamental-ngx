import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./timeline-header-docs/timeline-header-docs.component').then((c) => c.TimelineHeaderDocsComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./timeline-docs.component').then((c) => c.TimelineDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'timeline';
export const API_FILE_KEY = 'timeline';

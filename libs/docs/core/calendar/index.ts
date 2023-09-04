import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./calendar-header/calendar-header.component').then((c) => c.CalendarHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./calendar-docs.component').then((c) => c.CalendarDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'calendar';
export const API_FILE_KEY = 'calendar';

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./time-header/time-header.component').then((c) => c.TimeHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./time-docs.component').then((c) => c.TimeDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'time';
export const API_FILE_KEY = 'time';
export const I18N_KEY = 'coreTime';

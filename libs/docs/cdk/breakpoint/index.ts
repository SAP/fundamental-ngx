import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./breakpoint-header/breakpoint-header.component').then((c) => c.BreakpointHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./breakpoint-docs.component').then((c) => c.BreakpointDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'breakpoint';
export const API_FILE_KEY = 'breakpoint';

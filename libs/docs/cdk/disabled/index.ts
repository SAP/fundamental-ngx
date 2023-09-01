import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./disabled-header/disabled-header.component').then((c) => c.DisabledHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./disabled-docs.component').then((c) => c.DisabledDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'disabled';

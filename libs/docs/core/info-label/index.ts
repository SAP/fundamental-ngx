import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./info-label-header/info-label-header.component').then((c) => c.InfoLabelHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./info-label-docs.component').then((c) => c.InfoLabelDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'info-label';
export const API_FILE_KEY = 'infoLabel';

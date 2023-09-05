import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./panel-docs-header/panel-docs-header.component').then((c) => c.PanelDocsHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./panel-docs.component').then((c) => c.PanelDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'panel';
export const API_FILE_KEY = 'panel';

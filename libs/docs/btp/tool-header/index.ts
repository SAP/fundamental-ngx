import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tool-header-header/tool-header-header.component').then((c) => c.ToolHeaderHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./tool-header-docs.component').then((c) => c.ToolHeaderDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tool-header';
export const API_FILE_KEY = 'toolHeader';

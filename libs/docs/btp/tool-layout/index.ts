import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tool-layout-header/tool-layout-header.component').then((c) => c.ToolLayoutHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./tool-layout-docs.component').then((c) => c.ToolLayoutDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tool-layout';
export const API_FILE_KEY = 'toolLayout';

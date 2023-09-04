import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-page-header/message-page-header.component').then((c) => c.MessagePageHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./message-page-docs.component').then((c) => c.MessagePageDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-page';
export const API_FILE_KEY = 'messagePage';

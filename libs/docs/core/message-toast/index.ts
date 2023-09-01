import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-toast-header/message-toast-header.component').then((c) => c.MessageToastHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./message-toast-docs.component').then((c) => c.MessageToastDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-toast';
export const API_FILE_KEY = 'messageToast';

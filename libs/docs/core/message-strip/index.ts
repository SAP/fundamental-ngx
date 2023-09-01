import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-strip-header/message-strip-header.component').then((c) => c.MessageStripHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./message-strip-docs.component').then((c) => c.MessageStripDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-strip';
export const API_FILE_KEY = 'messageStrip';

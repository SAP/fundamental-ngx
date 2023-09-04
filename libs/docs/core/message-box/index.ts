import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-box-docs-header/message-box-docs-header.component').then(
                (c) => c.MessageBoxDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./message-box-docs.component').then((c) => c.MessageBoxDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-box';
export const API_FILE_KEY = 'messageBox';

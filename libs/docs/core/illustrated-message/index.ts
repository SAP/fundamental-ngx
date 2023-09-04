import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./illustrated-message-header/illustrated-message-header.component').then(
                (c) => c.IllustratedMessageHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./illustrated-message-docs.component').then((c) => c.IllustratedMessageDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'illustrated-message';
export const API_FILE_KEY = 'illustratedMessage';

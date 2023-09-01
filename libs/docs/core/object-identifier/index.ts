import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-identifier-header/object-identifier-header.component').then(
                (c) => c.ObjectIdentifierHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./object-identifier-docs.component').then((c) => c.ObjectIdentifierDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-identifier';
export const API_FILE_KEY = 'objectIdentifier';

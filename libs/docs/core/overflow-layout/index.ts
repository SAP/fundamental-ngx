import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./overflow-layout-header/overflow-layout-header.component').then(
                (c) => c.OverflowLayoutHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./overflow-layout-docs.component').then((c) => c.OverflowLayoutDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'overflow-layout';
export const API_FILE_KEY = 'overflowLayout';
export const I18N_KEY = 'coreOverflowLayout';

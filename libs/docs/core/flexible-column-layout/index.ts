import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./flexible-column-layout-docs-header/flexible-column-layout-docs-header.component').then(
                (c) => c.FlexibleColumnLayoutDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./flexible-column-layout-docs.component').then((c) => c.FlexibleColumnLayoutDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'flexible-column-layout';
export const API_FILE_KEY = 'flexibleColumnLayout';

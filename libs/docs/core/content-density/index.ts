import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./content-density-header/content-density-header.component').then(
                (c) => c.ContentDensityHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./content-density-docs.component').then((c) => c.ContentDensityDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'content-density';
export const API_FILE_KEY = 'contentDensity';

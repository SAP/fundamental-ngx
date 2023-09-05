import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./resizable-card-layout-docs-header/resizable-card-layout-docs-header.component').then(
                (c) => c.ResizableCardLayoutDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./resizable-card-layout-docs.component').then((c) => c.ResizableCardLayoutDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'resizable-card-layout';
export const API_FILE_KEY = 'resizableCardLayout';

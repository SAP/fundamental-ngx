import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout-panel-docs-header/layout-panel-docs-header.component').then(
                (c) => c.LayoutPanelDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./layout-panel-docs.component').then((c) => c.LayoutPanelDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'layout-panel';
export const API_FILE_KEY = 'layoutPanel';

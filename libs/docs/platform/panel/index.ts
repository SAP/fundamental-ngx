import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-panel-header/platform-panel-header.component').then(
                (c) => c.PlatformPanelHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-panel-docs.component').then((c) => c.PlatformPanelDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'panel';
export const API_FILE_KEY = 'panel';

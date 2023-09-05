import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-display-list-item-header/platform-display-list-item-header.component').then(
                (c) => c.PlatformDisplayListItemHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-display-list-item-docs.component').then(
                        (c) => c.PlatformDisplayListItemDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'display-list-item';
export const API_FILE_KEY = 'displaylistitem';

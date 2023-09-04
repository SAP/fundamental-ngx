import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-action-list-item-header/platform-action-list-item-header.component').then(
                (c) => c.PlatformActionListItemHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-action-list-item-docs.component').then(
                        (c) => c.PlatformActionListItemDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-list-item';
export const API_FILE_KEY = 'actionlistitem';

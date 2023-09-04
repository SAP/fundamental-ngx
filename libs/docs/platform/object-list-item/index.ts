import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-object-list-item-header/platform-object-list-item-header.component').then(
                (c) => c.PlatformObjectListItemHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-list-item-docs.component').then(
                        (c) => c.PlatformObjectListItemDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-list-item';
export const API_FILE_KEY = 'objectlistitem';
export const I18N_KEY = 'platformObjectListItem';

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-standard-list-item-header/platform-standard-list-item-header.component').then(
                (c) => c.PlatformStandardListItemHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-standard-list-item-docs.component').then(
                        (c) => c.PlatformStandardListItemDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'standard-list-item';
export const API_FILE_KEY = 'standardlistitem';
export const I18N_KEY = 'platformStandardListItem';

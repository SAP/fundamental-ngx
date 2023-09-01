import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-thumbnail-header/platform-thumbnail-header.component').then(
                (c) => c.PlatformThumbnailHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-thumbnail.docs.component').then((c) => c.PlatformThumbnailDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'thumbnail';
export const API_FILE_KEY = 'thumbnail';
export const I18N_KEY = 'platformThumbnail';

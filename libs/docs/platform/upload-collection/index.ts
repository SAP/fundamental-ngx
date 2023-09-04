import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-upload-collection-header/platform-upload-collection-header.component').then(
                (c) => c.PlatformUploadCollectionHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-upload-collection-docs.component').then(
                        (c) => c.PlatformUploadColletionDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'upload-collection';
export const API_FILE_KEY = 'uploadCollection';
export const I18N_KEY = 'platformUploadCollection';

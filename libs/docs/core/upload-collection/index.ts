import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./upload-collection-header/upload-collection-header.component').then(
                (c) => c.UploadCollectionHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./upload-collection-docs.component').then((c) => c.UploadCollectionDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'upload-collection';
export const API_FILE_KEY = 'uploadCollection';
export const I18N_KEY = 'coreUploadCollection';

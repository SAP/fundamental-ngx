import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-file-uploader-header/platform-file-uploader-header.component').then(
                (c) => c.PlatformFileUploaderHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-file-uploader-docs.component').then((c) => c.PlatformFileUploaderDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'file-uploader';
export const API_FILE_KEY = 'fileUploader';

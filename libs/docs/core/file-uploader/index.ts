import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./file-uploader-header/file-uploader-header.component').then((c) => c.FileUploaderHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./file-uploader-docs.component').then((c) => c.FileUploaderDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'file-uploader';
export const API_FILE_KEY = 'fileUploader';

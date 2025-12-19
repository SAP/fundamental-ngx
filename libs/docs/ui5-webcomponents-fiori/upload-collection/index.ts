import { Routes } from '@angular/router';
import { UploadCollectionHeader } from './header/upload-collection-header';
import { UploadCollectionDocs } from './upload-collection-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: UploadCollectionHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: UploadCollectionDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'upload-collection';
export const API_FILE_KEY = 'uploadCollection';

import { Routes } from '@angular/router';
import { PlatformUploadColletionDocsComponent } from './platform-upload-collection-docs.component';
import { PlatformUploadCollectionHeaderComponent } from './platform-upload-collection-header/platform-upload-collection-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformUploadCollectionHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformUploadColletionDocsComponent
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

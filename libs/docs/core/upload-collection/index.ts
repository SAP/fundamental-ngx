import { Routes } from '@angular/router';
import { UploadCollectionDocsComponent } from './upload-collection-docs.component';
import { UploadCollectionHeaderComponent } from './upload-collection-header/upload-collection-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: UploadCollectionHeaderComponent,
        children: [
            {
                path: '',
                component: UploadCollectionDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'upload-collection';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/upload-collection';
export const API_FILE_KEY = 'uploadCollection';
export const I18N_KEY = 'coreUploadCollection';

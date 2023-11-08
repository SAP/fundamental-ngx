import { Routes } from '@angular/router';
import { PlatformFileUploaderDocsComponent } from './platform-file-uploader-docs.component';
import { PlatformFileUploaderHeaderComponent } from './platform-file-uploader-header/platform-file-uploader-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformFileUploaderHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformFileUploaderDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'file-uploader';
export const API_FILE_KEY = 'fileUploader';

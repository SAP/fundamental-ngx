import { Routes } from '@angular/router';
import { FileUploaderDocsComponent } from './file-uploader-docs.component';
import { FileUploaderHeaderComponent } from './file-uploader-header/file-uploader-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FileUploaderHeaderComponent,
        children: [
            {
                path: '',
                component: FileUploaderDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'file-uploader';
export const API_FILE_KEY = 'fileUploader';

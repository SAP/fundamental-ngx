import { Routes } from '@angular/router';
import { FileUploaderDocs } from './file-uploader-docs';
import { FileUploaderHeader } from './header/file-uploader-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: FileUploaderHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: FileUploaderDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'file-uploader';
export const API_FILE_KEY = 'fileUploader';

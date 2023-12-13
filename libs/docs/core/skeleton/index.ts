import { Routes } from '@angular/router';
import { SkeletonDocsComponent } from './skeleton-docs.component';
import { SkeletonHeaderComponent } from './skeleton-header/skeleton-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SkeletonHeaderComponent,
        children: [
            {
                path: '',
                component: SkeletonDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'skeleton';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/skeleton';
export const API_FILE_KEY = 'skeleton';

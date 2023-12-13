import { Routes } from '@angular/router';
import { AvatarDocsComponent } from './avatar-docs.component';
import { AvatarHeaderComponent } from './avatar-header/avatar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: AvatarHeaderComponent,
        children: [
            {
                path: '',
                component: AvatarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'avatar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/avatar';
export const API_FILE_KEY = 'avatar';

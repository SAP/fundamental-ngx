import { Routes } from '@angular/router';
import { AvatarGroupDocsComponent } from './avatar-group-docs.component';
import { AvatarGroupHeaderComponent } from './avatar-group-header/avatar-group-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: AvatarGroupHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: AvatarGroupDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'avatar-group';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/avatar-group';
export const API_FILE_KEY = 'avatarGroup';

import { Routes } from '@angular/router';
import { AvatarGroupDocs } from './avatar-group-docs';
import { AvatarGroupHeader } from './header/avatar-group-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: AvatarGroupHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: AvatarGroupDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'avatar-group';
export const API_FILE_KEY = 'avatarGroup';

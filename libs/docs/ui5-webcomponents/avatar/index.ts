import { Routes } from '@angular/router';
import { AvatarDocs } from './avatar-docs';
import { AvatarHeader } from './header/avatar-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: AvatarHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: AvatarDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'avatar';
export const API_FILE_KEY = 'avatar';

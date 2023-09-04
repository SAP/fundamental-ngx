import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./avatar-group-header/avatar-group-header.component').then((c) => c.AvatarGroupHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./avatar-group-docs.component').then((c) => c.AvatarGroupDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'avatar-group';
export const API_FILE_KEY = 'avatarGroup';

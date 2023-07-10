import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./avatar-group-header/avatar-group-header.component').then(
                (m) => m.AvatarGroupHeaderComponent
            ),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./avatar-group-docs.component').then((m) => m.AvatarGroupDocsComponent)
            }
        ]
    }
];

export const LIBRARY_NAME = 'avatar-group';
export const API_FILE_KEY = 'avatarGroup';

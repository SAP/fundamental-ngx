import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./avatar-group-legacy-header/avatar-group-legacy-header.component').then(
                (m) => m.AvatarGroupLegacyHeaderComponent
            ),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./avatar-group-legacy-docs.component').then((m) => m.AvatarGroupLegacyDocsComponent)
            }
        ]
    }
];

export const LIBRARY_NAME = 'avatar-group-legacy';
export const API_FILE_KEY = 'avatarGroupLegacy';

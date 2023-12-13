import { Routes } from '@angular/router';
import { AvatarGroupLegacyDocsComponent } from './avatar-group-legacy-docs.component';
import { AvatarGroupLegacyHeaderComponent } from './avatar-group-legacy-header/avatar-group-legacy-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: AvatarGroupLegacyHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: AvatarGroupLegacyDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'avatar-group-legacy';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/avatar-group-legacy';
export const API_FILE_KEY = 'avatarGroupLegacy';

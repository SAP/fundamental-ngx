import { Routes } from '@angular/router';
import { UserSettingsDialogHeader } from './header/user-settings-dialog-header';
import { UserSettingsDialogDocs } from './user-settings-dialog-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: UserSettingsDialogHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: UserSettingsDialogDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'user-settings-dialog';
export const API_FILE_KEY = 'userSettingsDialog';

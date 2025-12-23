import { Routes } from '@angular/router';
import { ViewSettingsDialogHeader } from './header/view-settings-dialog-header';
import { ViewSettingsDialogDocs } from './view-settings-dialog-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ViewSettingsDialogHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ViewSettingsDialogDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'view-settings-dialog';
export const API_FILE_KEY = 'viewSettingsDialog';

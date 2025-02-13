import { Routes } from '@angular/router';
import { SettingsDialogDocsHeaderComponent } from './settings-dialog-docs-header/settings-dialog-docs-header.component';
import { SettingsDialogDocsComponent } from './settings-dialog-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SettingsDialogDocsHeaderComponent,
        children: [
            {
                path: '',
                component: SettingsDialogDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'settings-dialog';
export const API_FILE_KEY = 'settingsDialog';

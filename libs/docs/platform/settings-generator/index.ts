import { Routes } from '@angular/router';
import { SettingsGeneratorDocsComponent } from './settings-generator-docs.component';
import { SettingsGeneratorHeaderComponent } from './settings-generator-header/settings-generator-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SettingsGeneratorHeaderComponent,
        children: [
            {
                path: '',
                component: SettingsGeneratorDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'settings-generator';
export const API_FILE_KEY = 'settingsGenerator';

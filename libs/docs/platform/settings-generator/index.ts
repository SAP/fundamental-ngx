import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./settings-generator-header/settings-generator-header.component').then(
                (c) => c.SettingsGeneratorHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./settings-generator-docs.component').then((c) => c.SettingsGeneratorDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'settings-generator';
export const API_FILE_KEY = 'settingsGenerator';

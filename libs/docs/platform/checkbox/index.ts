import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-checkbox-header/platform-checkbox-header.component').then(
                (c) => c.PlatformCheckboxHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-checkbox-docs.component').then((c) => c.PlatformCheckboxDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'checkbox';
export const API_FILE_KEY = 'checkbox';

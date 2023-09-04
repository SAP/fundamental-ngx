import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-checkbox-group-header/platform-checkbox-group-header.component').then(
                (c) => c.PlatformCheckboxGroupHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-checkbox-group-docs.component').then((c) => c.PlatformCheckboxGroupDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'checkbox-group';
export const API_FILE_KEY = 'checkboxGroup';

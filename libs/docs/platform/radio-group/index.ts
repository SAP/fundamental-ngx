import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-radio-group-header/platform-radio-group-header.component').then(
                (c) => c.PlatformRadioGroupHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-radio-group-docs.component').then((c) => c.PlatformRadioGroupDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'radio-group';
export const API_FILE_KEY = 'radioGroup';

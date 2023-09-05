import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-date-picker-header/platform-date-picker-header.component').then(
                (c) => c.PlatformDatePickerHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-date-picker-docs.component').then((c) => c.PlatformDatePickerDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'date-picker';
export const API_FILE_KEY = 'datePicker';

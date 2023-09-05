import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-datetime-picker-header/platform-datetime-picker-header.component').then(
                (c) => c.PlatformDatetimePickerHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-datetime-picker-docs.component').then(
                        (c) => c.PlatformDatetimePickerDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'datetime-picker';
export const API_FILE_KEY = 'datetimePicker';

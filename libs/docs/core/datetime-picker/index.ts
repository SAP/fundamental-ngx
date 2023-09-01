import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./datetime-picker-header/datetime-picker-header.component').then(
                (c) => c.DatetimePickerHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./datetime-picker-docs.component').then((c) => c.DatetimePickerDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'datetime-picker';
export const API_FILE_KEY = 'datetimePicker';
export const I18N_KEY = 'coreDatetimePicker';

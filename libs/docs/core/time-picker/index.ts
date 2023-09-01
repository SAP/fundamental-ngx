import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./time-picker-header/time-picker-header.component').then((c) => c.TimePickerHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./time-picker-docs.component').then((c) => c.TimePickerDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'time-picker';
export const API_FILE_KEY = 'timePicker';
export const I18N_KEY = 'coreTimePicker';

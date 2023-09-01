import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./date-picker-header/date-picker-header.component').then((c) => c.DatePickerHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./date-picker-docs.component').then((c) => c.DatePickerDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'date-picker';
export const API_FILE_KEY = 'datePicker';

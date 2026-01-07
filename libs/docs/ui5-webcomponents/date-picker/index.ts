import { Routes } from '@angular/router';
import { DatePickerDocs } from './date-picker-docs';
import { DatePickerHeader } from './header/date-picker-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: DatePickerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DatePickerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'date-picker';
export const API_FILE_KEY = 'datePicker';

import { Routes } from '@angular/router';
import { DateTimePickerDocs } from './date-time-picker-docs';
import { DateTimePickerHeader } from './header/date-time-picker-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: DateTimePickerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DateTimePickerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'date-time-picker';
export const API_FILE_KEY = 'dateTimePicker';

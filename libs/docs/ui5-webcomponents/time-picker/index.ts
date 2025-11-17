import { Routes } from '@angular/router';
import { TimePickerHeader } from './header/time-picker-header';
import { TimePickerDocs } from './time-picker-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TimePickerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TimePickerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'time-picker';
export const API_FILE_KEY = 'timePicker';

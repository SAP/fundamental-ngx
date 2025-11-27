import { Routes } from '@angular/router';
import { DateRangePickerDocs } from './date-range-picker-docs';
import { DateRangePickerHeader } from './header/date-range-picker-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: DateRangePickerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DateRangePickerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'date-range-picker';
export const API_FILE_KEY = 'dateRangePicker';

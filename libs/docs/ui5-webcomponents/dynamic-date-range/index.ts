import { Routes } from '@angular/router';
import { DynamicDateRangeDocs } from './dynamic-date-range-docs';
import { DynamicDateRangeHeader } from './header/dynamic-date-range-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: DynamicDateRangeHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DynamicDateRangeDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'dynamic-date-range';
export const API_FILE_KEY = 'dynamicDateRange';

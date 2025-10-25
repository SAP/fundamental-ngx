import { Routes } from '@angular/router';
import { CalendarDocs } from './calendar-docs';
import { CalendarHeader } from './header/calendar-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: CalendarHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: CalendarDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'calendar';
export const API_FILE_KEY = 'calendar';

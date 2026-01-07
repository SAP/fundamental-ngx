import { Routes } from '@angular/router';
import { CalendarLegendDocs } from './calendar-legend-docs';
import { CalendarLegendHeader } from './header/calendar-legend-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: CalendarLegendHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: CalendarLegendDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'calendar-legend';
export const API_FILE_KEY = 'calendarLegend';

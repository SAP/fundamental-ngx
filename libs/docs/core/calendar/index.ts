import { Routes } from '@angular/router';
import { CalendarDocsComponent } from './calendar-docs.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CalendarHeaderComponent,
        children: [
            {
                path: '',
                component: CalendarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'calendar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/calendar';
export const API_FILE_KEY = 'calendar';

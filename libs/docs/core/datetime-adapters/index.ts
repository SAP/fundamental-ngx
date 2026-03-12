import { Routes } from '@angular/router';
import { DatetimeAdaptersDocsComponent } from './datetime-adapters-docs.component';
import { DatetimeAdaptersHeaderComponent } from './datetime-adapters-header/datetime-adapters-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DatetimeAdaptersHeaderComponent,
        children: [
            {
                path: '',
                component: DatetimeAdaptersDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'datetime-adapters';
export const API_FILE_KEY = 'datetimeAdapters';

import { Routes } from '@angular/router';
import { TimePickerDocsComponent } from './time-picker-docs.component';
import { TimePickerHeaderComponent } from './time-picker-header/time-picker-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TimePickerHeaderComponent,
        children: [
            {
                path: '',
                component: TimePickerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'time-picker';
export const API_FILE_KEY = 'timePicker';
export const I18N_KEY = 'coreTimePicker';

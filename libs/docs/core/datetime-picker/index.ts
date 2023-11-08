import { Routes } from '@angular/router';
import { DatetimePickerDocsComponent } from './datetime-picker-docs.component';
import { DatetimePickerHeaderComponent } from './datetime-picker-header/datetime-picker-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DatetimePickerHeaderComponent,
        children: [
            {
                path: '',
                component: DatetimePickerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'datetime-picker';
export const API_FILE_KEY = 'datetimePicker';
export const I18N_KEY = 'coreDatetimePicker';

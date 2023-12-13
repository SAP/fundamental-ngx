import { Routes } from '@angular/router';
import { DatePickerDocsComponent } from './date-picker-docs.component';
import { DatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DatePickerHeaderComponent,
        children: [
            {
                path: '',
                component: DatePickerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'date-picker';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/date-picker';
export const API_FILE_KEY = 'datePicker';
export const I18N_KEY = 'coreDatePicker';

import { Routes } from '@angular/router';
import { PlatformDatePickerDocsComponent } from './platform-date-picker-docs.component';
import { PlatformDatePickerHeaderComponent } from './platform-date-picker-header/platform-date-picker-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDatePickerHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformDatePickerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'date-picker';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/form';
export const API_FILE_KEY = 'datePicker';

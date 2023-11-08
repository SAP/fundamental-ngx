import { Routes } from '@angular/router';
import { PlatformDatetimePickerDocsComponent } from './platform-datetime-picker-docs.component';
import { PlatformDatetimePickerHeaderComponent } from './platform-datetime-picker-header/platform-datetime-picker-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDatetimePickerHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformDatetimePickerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'datetime-picker';
export const API_FILE_KEY = 'datetimePicker';

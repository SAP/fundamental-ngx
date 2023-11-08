import { Routes } from '@angular/router';
import { PlatformTimePickerDocsComponent } from './platform-time-picker-docs.component';
import { PlatformTimePickerHeaderComponent } from './platform-time-picker-header/platform-time-picker-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformTimePickerHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformTimePickerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'time-picker';
export const API_FILE_KEY = 'timePicker';

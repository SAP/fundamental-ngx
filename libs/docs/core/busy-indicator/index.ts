import { Routes } from '@angular/router';
import { BusyIndicatorDocsComponent } from './busy-indicator-docs.component';
import { BusyIndicatorHeaderComponent } from './busy-indicator-header/busy-indicator-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: BusyIndicatorHeaderComponent,
        children: [
            {
                path: '',
                component: BusyIndicatorDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'busy-indicator';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/busy-indicator';
export const API_FILE_KEY = 'busyIndicator';

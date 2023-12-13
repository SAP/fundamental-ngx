import { Routes } from '@angular/router';
import { StatusIndicatorDocsComponent } from './status-indicator-docs.component';
import { StatusIndicatorHeaderComponent } from './status-indicator-header/status-indicator-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: StatusIndicatorHeaderComponent,
        children: [
            {
                path: '',
                component: StatusIndicatorDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'status-indicator';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/status-indicator';
export const API_FILE_KEY = 'statusIndicator';

import { Routes } from '@angular/router';
import { PlatformObjectStatusDocsComponent } from './platform-object-status-docs.component';
import { PlatformObjectStatusHeaderComponent } from './platform-object-status-header/platform-object-status-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformObjectStatusHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformObjectStatusDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-status';
export const API_FILE_KEY = 'objectStatus';

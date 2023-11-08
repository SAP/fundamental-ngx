import { Routes } from '@angular/router';
import { PlatformInputGroupDocsComponent } from './platform-input-group-docs.component';
import { PlatformInputGroupHeaderComponent } from './platform-input-group-header/platform-input-group-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformInputGroupHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformInputGroupDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input-group';
export const API_FILE_KEY = 'inputGroup';

import { Routes } from '@angular/router';
import { PlatformInputDocsComponent } from './platform-input-docs.component';
import { PlatformInputHeaderComponent } from './platform-input-header/platform-input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformInputHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformInputDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'input';
export const API_FILE_KEY = 'input';

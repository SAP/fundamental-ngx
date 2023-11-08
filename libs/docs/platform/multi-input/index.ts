import { Routes } from '@angular/router';
import { PlatformMultiInputDocsComponent } from './platform-multi-input-docs.component';
import { PlatformMultiInputHeaderComponent } from './platform-multi-input-header/platform-multi-input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformMultiInputHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformMultiInputDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-input';
export const API_FILE_KEY = 'multiInput';

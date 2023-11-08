import { Routes } from '@angular/router';
import { PlatformCheckboxDocsComponent } from './platform-checkbox-docs.component';
import { PlatformCheckboxHeaderComponent } from './platform-checkbox-header/platform-checkbox-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformCheckboxHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformCheckboxDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'checkbox';
export const API_FILE_KEY = 'checkbox';

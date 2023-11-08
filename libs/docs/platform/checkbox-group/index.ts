import { Routes } from '@angular/router';
import { PlatformCheckboxGroupDocsComponent } from './platform-checkbox-group-docs.component';
import { PlatformCheckboxGroupHeaderComponent } from './platform-checkbox-group-header/platform-checkbox-group-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformCheckboxGroupHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformCheckboxGroupDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'checkbox-group';
export const API_FILE_KEY = 'checkboxGroup';

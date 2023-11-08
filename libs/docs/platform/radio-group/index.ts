import { Routes } from '@angular/router';
import { PlatformRadioGroupDocsComponent } from './platform-radio-group-docs.component';
import { PlatformRadioGroupHeaderComponent } from './platform-radio-group-header/platform-radio-group-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformRadioGroupHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformRadioGroupDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'radio-group';
export const API_FILE_KEY = 'radioGroup';

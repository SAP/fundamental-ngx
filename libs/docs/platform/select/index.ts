import { Routes } from '@angular/router';
import { PlatformSelectDocsComponent } from './platform-select-docs.component';
import { PlatformSelectHeaderComponent } from './platform-select-header/platform-select-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformSelectHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformSelectDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'select';
export const API_FILE_KEY = 'select';
export const I18N_KEY = 'platformSelect';

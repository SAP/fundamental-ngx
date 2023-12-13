import { Routes } from '@angular/router';
import { PlatformStepInputDocsComponent } from './platform-step-input-docs.component';
import { PlatformStepInputHeaderComponent } from './platform-step-input-header/platform-step-input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformStepInputHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformStepInputDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'step-input';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/form';
export const API_FILE_KEY = 'stepInput';

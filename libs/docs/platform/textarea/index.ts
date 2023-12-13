import { Routes } from '@angular/router';
import { PlatformTextareaDocsComponent } from './platform-textarea-docs.component';
import { PlatformTextareaHeaderComponent } from './platform-textarea-header/platform-textarea-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformTextareaHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformTextareaDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'textarea';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/form';
export const API_FILE_KEY = 'textarea';
export const I18N_KEY = 'platformTextarea';

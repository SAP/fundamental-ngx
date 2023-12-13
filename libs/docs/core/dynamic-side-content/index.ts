import { Routes } from '@angular/router';
import { DynamicSideContentDocsComponent } from './dynamic-side-content-docs.component';
import { DynamicSideContentHeaderComponent } from './dynamic-side-content-header/dynamic-side-content-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DynamicSideContentHeaderComponent,
        children: [
            {
                path: '',
                component: DynamicSideContentDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dynamic-side-content';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/dynamic-side-content';
export const API_FILE_KEY = 'dynamicSideContent';

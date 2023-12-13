import { Routes } from '@angular/router';
import { ThemingDocsComponent } from './theming-docs.component';
import { ThemingHeaderComponent } from './theming-header/theming-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ThemingHeaderComponent,
        children: [
            {
                path: '',
                component: ThemingDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'theming';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/theming';
export const API_FILE_KEY = 'theming';

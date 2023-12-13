import { Routes } from '@angular/router';
import { BarDocsComponent } from './bar-docs.component';
import { BarHeaderComponent } from './bar-header/bar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: BarHeaderComponent,
        children: [
            {
                path: '',
                component: BarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'bar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/bar';
export const API_FILE_KEY = 'bar';

import { Routes } from '@angular/router';
import { InfoLabelDocsComponent } from './info-label-docs.component';
import { InfoLabelHeaderComponent } from './info-label-header/info-label-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: InfoLabelHeaderComponent,
        children: [
            {
                path: '',
                component: InfoLabelDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'info-label';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/info-label';
export const API_FILE_KEY = 'infoLabel';

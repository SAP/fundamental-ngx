import { Routes } from '@angular/router';
import { PlatformInfoLabelDocsComponent } from './platform-info-label-docs.component';
import { PlatformInfoLabelHeaderComponent } from './platform-info-label-header/platform-info-label-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformInfoLabelHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformInfoLabelDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'info-label';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/info-label';
export const API_FILE_KEY = 'infoLabel';

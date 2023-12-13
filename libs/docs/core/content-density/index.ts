import { Routes } from '@angular/router';
import { ContentDensityDocsComponent } from './content-density-docs.component';
import { ContentDensityHeaderComponent } from './content-density-header/content-density-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ContentDensityHeaderComponent,
        children: [
            {
                path: '',
                component: ContentDensityDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'content-density';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/content-density';
export const API_FILE_KEY = 'contentDensity';

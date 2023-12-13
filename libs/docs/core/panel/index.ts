import { Routes } from '@angular/router';
import { PanelDocsHeaderComponent } from './panel-docs-header/panel-docs-header.component';
import { PanelDocsComponent } from './panel-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PanelDocsHeaderComponent,
        children: [
            {
                path: '',
                component: PanelDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'panel';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/panel';
export const API_FILE_KEY = 'panel';

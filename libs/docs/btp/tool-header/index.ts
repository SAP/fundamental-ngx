import { Routes } from '@angular/router';
import { ToolHeaderDocsComponent } from './tool-header-docs.component';
import { ToolHeaderHeaderComponent } from './tool-header-header/tool-header-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ToolHeaderHeaderComponent,
        children: [
            {
                path: '',
                component: ToolHeaderDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tool-header';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/btp/tool-header';
export const API_FILE_KEY = 'toolHeader';

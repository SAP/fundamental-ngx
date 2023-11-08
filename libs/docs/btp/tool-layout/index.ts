import { Routes } from '@angular/router';
import { ToolLayoutDocsComponent } from './tool-layout-docs.component';
import { ToolLayoutHeaderComponent } from './tool-layout-header/tool-layout-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ToolLayoutHeaderComponent,
        children: [
            {
                path: '',
                component: ToolLayoutDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tool-layout';
export const API_FILE_KEY = 'toolLayout';

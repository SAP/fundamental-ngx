import { Routes } from '@angular/router';
import { ResizableCardLayoutDocsHeaderComponent } from './resizable-card-layout-docs-header/resizable-card-layout-docs-header.component';
import { ResizableCardLayoutDocsComponent } from './resizable-card-layout-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ResizableCardLayoutDocsHeaderComponent,
        children: [
            {
                path: '',
                component: ResizableCardLayoutDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'resizable-card-layout';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/resizable-card-layout';
export const API_FILE_KEY = 'resizableCardLayout';

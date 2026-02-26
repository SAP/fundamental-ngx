import { Routes } from '@angular/router';
import { ToolbarDocumentationComponent } from './toolbar-documentation.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ToolbarHeaderComponent,
        children: [
            {
                path: '',
                component: ToolbarDocumentationComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'toolbar';
export const API_FILE_KEY = 'toolbar';

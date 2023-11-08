import { Routes } from '@angular/router';
import { DialogDocsHeaderComponent } from './dialog-docs-header/dialog-docs-header.component';
import { DialogDocsComponent } from './dialog-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DialogDocsHeaderComponent,
        children: [
            {
                path: '',
                component: DialogDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dialog';
export const API_FILE_KEY = 'dialog';

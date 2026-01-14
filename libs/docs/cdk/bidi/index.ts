import { Routes } from '@angular/router';
import { BidiDocsHeaderComponent } from './bidi-docs-header/bidi-docs-header.component';
import { BidiDocsComponent } from './bidi-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: BidiDocsHeaderComponent,
        children: [
            {
                path: '',
                component: BidiDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];

export const LIBRARY_NAME = 'bidi';
export const API_FILE_KEY = 'bidiService';

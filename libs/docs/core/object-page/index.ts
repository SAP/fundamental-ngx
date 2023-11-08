import { Routes } from '@angular/router';
import { ObjectPageDocsComponent } from './object-page-docs.component';
import { ObjectPageDocsHeaderComponent } from './object-page-header/object-page-docs-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ObjectPageDocsHeaderComponent,
        children: [
            {
                path: '',
                component: ObjectPageDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-page';
export const API_FILE_KEY = 'dynamicPage';

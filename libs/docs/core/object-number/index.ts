import { Routes } from '@angular/router';
import { ObjectNumberDocsComponent } from './object-number-docs.component';
import { ObjectNumberHeaderComponent } from './object-number-header/object-number-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ObjectNumberHeaderComponent,
        children: [
            {
                path: '',
                component: ObjectNumberDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-number';
export const API_FILE_KEY = 'objectNumber';

import { Routes } from '@angular/router';
import { ObjectAttributeDocsComponent } from './object-attribute-docs.component';
import { ObjectAttributeHeaderComponent } from './object-attribute-header/object-attribute-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ObjectAttributeHeaderComponent,
        children: [
            {
                path: '',
                component: ObjectAttributeDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-attribute';
export const API_FILE_KEY = 'objectAttribute';

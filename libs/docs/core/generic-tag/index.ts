import { Routes } from '@angular/router';
import { GenericTagDocsComponent } from './generic-tag-docs.component';
import { GenericTagHeaderComponent } from './generic-tag-header/generic-tag-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: GenericTagHeaderComponent,
        data: {
            primary: true
        },
        children: [
            {
                path: '',
                component: GenericTagDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'generic-tag';
export const API_FILE_KEY = 'genericTag';

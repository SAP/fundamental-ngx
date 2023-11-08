import { Routes } from '@angular/router';
import { FormsDocsComponent } from './forms-docs.component';
import { FormsHeaderComponent } from './forms-header/forms-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FormsHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: FormsDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'forms';
export const API_FILE_KEY = 'forms';

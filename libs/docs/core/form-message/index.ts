import { Routes } from '@angular/router';
import { FormMessageDocsComponent } from './form-message-docs.component';
import { FormMessageHeaderComponent } from './form-message-header/form-message-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FormMessageHeaderComponent,
        children: [
            {
                path: '',
                component: FormMessageDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'form-message';
export const API_FILE_KEY = 'formMessage';

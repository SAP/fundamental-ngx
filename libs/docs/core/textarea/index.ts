import { Routes } from '@angular/router';
import { TextareaDocsComponent } from './textarea-docs.component';
import { TextareaHeaderComponent } from './textarea-header/textarea-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TextareaHeaderComponent,
        children: [
            {
                path: '',
                component: TextareaDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'textarea';
export const API_FILE_KEY = 'form';

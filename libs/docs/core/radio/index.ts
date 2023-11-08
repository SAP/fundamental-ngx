import { Routes } from '@angular/router';
import { RadioDocsComponent } from './radio-docs.component';
import { RadioHeaderComponent } from './radio-header/radio-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: RadioHeaderComponent,
        children: [
            {
                path: '',
                component: RadioDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'radio';
export const API_FILE_KEY = 'form';

import { Routes } from '@angular/router';
import { FormDocs } from './form-docs';
import { FormHeader } from './header/form-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: FormHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: FormDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'form';
export const API_FILE_KEY = 'form';

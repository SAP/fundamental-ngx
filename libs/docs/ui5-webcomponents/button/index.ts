import { Routes } from '@angular/router';
import { ButtonDocs } from './button-docs';
import { ButtonHeader } from './header/button-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: ButtonHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ButtonDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'button';
export const API_FILE_KEY = 'button';

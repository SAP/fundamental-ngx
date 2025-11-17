import { Routes } from '@angular/router';
import { InputHeader } from './header/input-header';
import { InputDocs } from './input-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: InputHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: InputDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'input';
export const API_FILE_KEY = 'input';

import { Routes } from '@angular/router';
import { SelectHeader } from './header/select-header';
import { SelectDocs } from './select-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: SelectHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: SelectDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'select';
export const API_FILE_KEY = 'select';

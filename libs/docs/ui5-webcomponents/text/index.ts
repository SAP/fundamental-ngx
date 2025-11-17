import { Routes } from '@angular/router';
import { TextHeader } from './header/text-header';
import { TextDocs } from './text-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TextHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TextDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'text';
export const API_FILE_KEY = 'text';

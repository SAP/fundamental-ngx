import { Routes } from '@angular/router';
import { BarDocs } from './bar-docs';
import { BarHeader } from './header/bar-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: BarHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: BarDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'bar';
export const API_FILE_KEY = 'bar';

import { Routes } from '@angular/router';
import { ShellBarHeader } from './header/shellbar-header';
import { ShellBarDocs } from './shellbar-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ShellBarHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ShellBarDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'shellbar';
export const API_FILE_KEY = 'shellBar';

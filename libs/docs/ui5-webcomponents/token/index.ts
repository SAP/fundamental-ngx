import { Routes } from '@angular/router';
import { TokenHeader } from './header/token-header';
import { TokenDocs } from './token-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TokenHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TokenDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'token';
export const API_FILE_KEY = 'token';

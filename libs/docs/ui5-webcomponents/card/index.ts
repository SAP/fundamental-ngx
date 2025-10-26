import { Routes } from '@angular/router';
import { CardDocs } from './card-docs';
import { CardDocsHeader } from './header/card-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: CardDocsHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: CardDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'card';
export const API_FILE_KEY = 'card';

import { Routes } from '@angular/router';
import { ListDocsHeader } from './header/list-header';
import { ListDocs } from './list-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ListDocsHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ListDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'list';
export const API_FILE_KEY = 'list';

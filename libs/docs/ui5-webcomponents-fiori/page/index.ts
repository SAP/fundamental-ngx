import { Routes } from '@angular/router';
import { PageHeader } from './header/page-header';
import { PageDocs } from './page-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: PageHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: PageDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'page';
export const API_FILE_KEY = 'page';

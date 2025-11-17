import { Routes } from '@angular/router';
import { LinkDocsHeader } from './header/link-header';
import { LinkDocs } from './link-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: LinkDocsHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: LinkDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'link';
export const API_FILE_KEY = 'link';

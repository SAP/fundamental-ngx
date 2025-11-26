import { Routes } from '@angular/router';
import { BreadcrumbsDocs } from './breadcrumbs-docs';
import { BreadcrumbsHeader } from './header/breadcrumbs-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: BreadcrumbsHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: BreadcrumbsDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'breadcrumbs';
export const API_FILE_KEY = 'breadcrumbs';

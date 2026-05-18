import { Routes } from '@angular/router';
import { ThemingHeader } from './header/theming-header';
import { ThemingDocs } from './theming-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ThemingHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ThemingDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'theming';

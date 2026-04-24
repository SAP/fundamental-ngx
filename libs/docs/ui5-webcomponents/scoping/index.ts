import { Routes } from '@angular/router';
import { ScopingHeader } from './header/scoping-header';
import { ScopingDocs } from './scoping-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ScopingHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ScopingDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'scoping';

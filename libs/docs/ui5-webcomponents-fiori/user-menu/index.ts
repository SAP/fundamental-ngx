import { Routes } from '@angular/router';
import { UserMenuHeader } from './header/user-menu-header';
import { UserMenuDocs } from './user-menu-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: UserMenuHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: UserMenuDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'user-menu';
export const API_FILE_KEY = 'userMenu';

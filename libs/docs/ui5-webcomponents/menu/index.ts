import { Routes } from '@angular/router';
import { MenuHeader } from './header/menu-header';
import { MenuDocs } from './menu-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: MenuHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: MenuDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'menu';
export const API_FILE_KEY = 'menu';

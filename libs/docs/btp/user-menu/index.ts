import { Routes } from '@angular/router';
import { UserMenuDocsComponent } from './user-menu-docs.component';
import { UserMenuHeaderComponent } from './user-menu-header/user-menu-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: UserMenuHeaderComponent,
        children: [
            {
                path: '',
                component: UserMenuDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'user-menu';
export const API_FILE_KEY = 'userMenu';

import { Routes } from '@angular/router';
import { SideNavigationHeader } from './header/side-navigation-header';
import { SideNavigationDocs } from './side-navigation-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: SideNavigationHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: SideNavigationDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'side-navigation';
export const API_FILE_KEY = 'sideNavigation';

import { Routes } from '@angular/router';
import { NavigationLayoutHeader } from './header/navigation-layout-header';
import { NavigationLayoutDocs } from './navigation-layout-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: NavigationLayoutHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: NavigationLayoutDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'navigation-layout';
export const API_FILE_KEY = 'navigationLayout';

export * from './examples/navigation-layout-sample';
export * from './header/navigation-layout-header';
export * from './navigation-layout-docs';

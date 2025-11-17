import { Routes } from '@angular/router';
import { IconHeader } from './header/icon-header';
import { IconDocs } from './icon-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: IconHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: IconDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'icon';
export const API_FILE_KEY = 'icon';

import { Routes } from '@angular/router';
import { TitleHeader } from './header/title-header';
import { TitleDocs } from './title-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TitleHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TitleDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'title';
export const API_FILE_KEY = 'title';

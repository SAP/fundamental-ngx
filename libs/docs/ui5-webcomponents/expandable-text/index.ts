import { Routes } from '@angular/router';
import { ExpandableTextDocs } from './expandable-text-docs';
import { ExpandableTextHeader } from './header/expandable-text-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: ExpandableTextHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ExpandableTextDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'expandable-text';
export const API_FILE_KEY = 'expandableText';

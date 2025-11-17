import { Routes } from '@angular/router';
import { TagHeader } from './header/tag-header';
import { TagDocs } from './tag-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TagHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TagDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'tag';
export const API_FILE_KEY = 'tag';

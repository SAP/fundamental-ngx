import { Routes } from '@angular/router';
import { TreeHeader } from './header/tree-header';
import { TreeDocs } from './tree-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TreeHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TreeDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'tree';
export const API_FILE_KEY = 'tree';

import { Routes } from '@angular/router';
import { TableHeader } from './header/table-header';
import { TableDocs } from './table-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TableHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TableDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'table';
export const API_FILE_KEY = 'table';

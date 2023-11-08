import { Routes } from '@angular/router';
import { TableDocsHeaderComponent } from './table-docs-header/table-docs-header.component';
import { TableDocsComponent } from './table-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TableDocsHeaderComponent,
        children: [
            {
                path: '',
                component: TableDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'table';
export const API_FILE_KEY = 'table';

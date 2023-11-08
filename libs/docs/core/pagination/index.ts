import { Routes } from '@angular/router';
import { PaginationDocsComponent } from './pagination-docs.component';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PaginationHeaderComponent,
        children: [
            {
                path: '',
                component: PaginationDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'pagination';
export const API_FILE_KEY = 'pagination';
export const I18N_KEY = 'corePagination';

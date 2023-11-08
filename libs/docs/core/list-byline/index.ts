import { Routes } from '@angular/router';
import { ListBylineDocsComponent } from './list-byline-docs.component';
import { ListBylineHeaderComponent } from './list-byline-header/list-byline-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ListBylineHeaderComponent,
        children: [
            {
                path: '',
                component: ListBylineDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'list-byline';
export const API_FILE_KEY = 'list';

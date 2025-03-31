import { Routes } from '@angular/router';
import { ListSublineDocsComponent } from './list-subline-docs.component';
import { ListSublineHeaderComponent } from './list-subline-header/list-subline-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ListSublineHeaderComponent,
        children: [
            {
                path: '',
                component: ListSublineDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'list-subline';
export const API_FILE_KEY = 'list';

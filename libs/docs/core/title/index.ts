import { Routes } from '@angular/router';
import { TitleDocsComponent } from './title-docs.component';
import { TitleHeaderComponent } from './title-header/title-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TitleHeaderComponent,
        children: [
            {
                path: '',
                component: TitleDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'title';
export const API_FILE_KEY = 'title';

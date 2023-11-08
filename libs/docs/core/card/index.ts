import { Routes } from '@angular/router';
import { CardDocsComponent } from './card-docs.component';
import { CardHeaderComponent } from './card-header/card-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CardHeaderComponent,
        children: [
            {
                path: '',
                component: CardDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'card';
export const API_FILE_KEY = 'card';

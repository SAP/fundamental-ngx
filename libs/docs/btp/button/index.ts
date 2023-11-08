import { Routes } from '@angular/router';
import { ButtonDocsComponent } from './button-docs.component';
import { ButtonHeaderComponent } from './button-header/button-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ButtonHeaderComponent,
        children: [
            {
                path: '',
                component: ButtonDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'button';

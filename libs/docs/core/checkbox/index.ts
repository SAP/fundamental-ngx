import { Routes } from '@angular/router';
import { CheckboxDocsComponent } from './checkbox-docs.component';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: CheckboxHeaderComponent,
        children: [
            {
                path: '',
                component: CheckboxDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'checkbox';
export const API_FILE_KEY = 'checkbox';

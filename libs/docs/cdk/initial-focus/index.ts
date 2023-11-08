import { Routes } from '@angular/router';
import { InitialFocusDocsComponent } from './initial-focus-docs.component';
import { InitialFocusHeaderComponent } from './initial-focus-header/initial-focus-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: InitialFocusHeaderComponent,
        children: [
            {
                path: '',
                component: InitialFocusDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'initial-focus';
export const API_FILE_KEY = 'initialFocus';

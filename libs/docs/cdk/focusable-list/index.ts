import { Routes } from '@angular/router';
import { FocusableListDocsComponent } from './focusable-list-docs.component';
import { FocusableListHeaderComponent } from './focusable-list-header/focusable-list-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FocusableListHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableListDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'focusable-list';
export const API_FILE_KEY = 'focusableList';

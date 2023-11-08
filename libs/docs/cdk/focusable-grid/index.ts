import { Routes } from '@angular/router';
import { FocusableGridDocsComponent } from './focusable-grid-docs.component';
import { FocusableGridHeaderComponent } from './focusable-grid-header/focusable-grid-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FocusableGridHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableGridDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'focusable-grid';
export const API_FILE_KEY = 'focusableGrid';

import { Routes } from '@angular/router';
import { LineClampDocsComponent } from './line-clamp-docs.component';
import { LineClampHeaderComponent } from './line-clamp-header/line-clamp-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LineClampHeaderComponent,
        data: {
            primary: true
        },
        children: [
            {
                path: '',
                component: LineClampDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'line-clamp';
export const API_FILE_KEY = 'lineClamp';

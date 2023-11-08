import { Routes } from '@angular/router';
import { DisabledDocsComponent } from './disabled-docs.component';
import { DisabledHeaderComponent } from './disabled-header/disabled-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DisabledHeaderComponent,
        children: [
            {
                path: '',
                component: DisabledDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'disabled';
export const API_FILE_KEY = 'disabled';

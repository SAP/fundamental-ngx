import { Routes } from '@angular/router';
import { IconDocsComponent } from './icon-docs.component';
import { IconHeaderComponent } from './icon-header/icon-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: IconHeaderComponent,
        children: [
            {
                path: '',
                component: IconDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'icon';
export const API_FILE_KEY = 'icon';

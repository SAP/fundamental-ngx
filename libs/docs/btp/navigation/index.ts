import { Routes } from '@angular/router';
import { NavigationDocsComponent } from './navigation-docs.component';
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: NavigationHeaderComponent,
        children: [
            {
                path: '',
                component: NavigationDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'navigation';
export const API_FILE_KEY = 'navigation';

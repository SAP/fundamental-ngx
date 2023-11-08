import { Routes } from '@angular/router';
import { PlatformMenuDocsComponent } from './platform-menu-docs.component';
import { PlatformMenuHeaderComponent } from './platform-menu-header/platform-menu-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformMenuHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformMenuDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'menu';
export const API_FILE_KEY = 'menu';

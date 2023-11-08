import { Routes } from '@angular/router';
import { PlatformMenuButtonDocsComponent } from './platform-menu-button-docs.component';
import { PlatformMenuButtonHeaderComponent } from './platform-menu-button-header/platform-menu-button-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformMenuButtonHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformMenuButtonDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'menu-button';
export const API_FILE_KEY = 'menuButton';

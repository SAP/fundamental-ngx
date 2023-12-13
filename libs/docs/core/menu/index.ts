import { Routes } from '@angular/router';
import { MenuDocsComponent } from './menu-docs.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MenuHeaderComponent,
        children: [
            {
                path: '',
                component: MenuDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'menu';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/menu';
export const API_FILE_KEY = 'menu';

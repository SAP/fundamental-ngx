import { Routes } from '@angular/router';
import { IconDocsComponent } from './icon-docs.component';
import { IconHeaderComponent } from './icon-header/icon-header.component';
import { SearchIconsComponent } from './search-icons/search-icons.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: IconHeaderComponent,
        children: [
            {
                path: '',
                component: IconDocsComponent
            },
            {
                path: 'search',
                component: SearchIconsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'icon';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/icon';
export const API_FILE_KEY = 'icon';

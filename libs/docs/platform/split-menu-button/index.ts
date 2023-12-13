import { Routes } from '@angular/router';
import { PlatformDocsSplitMenuButtonHeaderComponent } from './platform-split-menu-button-header/platform-split-menu-button-header.component';
import { PlatformDocsSplitMenuButtonComponent } from './platform-split-menu-button.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDocsSplitMenuButtonHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformDocsSplitMenuButtonComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'split-menu-button';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/split-menu-button';
export const API_FILE_KEY = 'splitMenuButton';

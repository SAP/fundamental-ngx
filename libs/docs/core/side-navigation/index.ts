import { Routes } from '@angular/router';
import { SideNavigationDocsComponent } from './side-navigation-docs.component';
import { SideNavigationHeaderComponent } from './side-navigation-header/side-navigation-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SideNavigationHeaderComponent,
        children: [
            {
                path: '',
                component: SideNavigationDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'side-navigation';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/side-navigation';
export const API_FILE_KEY = 'sideNavigation';
export const I18N_KEY = 'coreNestedList';

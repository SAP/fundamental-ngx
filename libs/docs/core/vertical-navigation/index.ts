import { Routes } from '@angular/router';
import { VerticalNavigationDocsComponent } from './vertical-navigation-docs.component';
import { VerticalNavigationHeaderComponent } from './vertical-navigation-header/vertical-navigation-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: VerticalNavigationHeaderComponent,
        children: [
            {
                path: '',
                component: VerticalNavigationDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'vertical-navigation';
export const API_FILE_KEY = 'verticalNavigation';
export const I18N_KEY = 'coreNavigation';

import { Routes } from '@angular/router';
import { GlobalConfigDocsComponent } from './global-config-docs.component';
import { GlobalConfigHeaderComponent } from './global-config-header/global-config-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: GlobalConfigHeaderComponent,
        children: [
            {
                path: '',
                component: GlobalConfigDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'global-config';
export const API_FILE_KEY = 'globalConfig';

import { Routes } from '@angular/router';
import { PlatformActionBarDocsComponent } from './platform-action-bar-docs.component';
import { PlatformActionBarHeaderComponent } from './platform-action-bar-header/platform-action-bar-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformActionBarHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformActionBarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-bar';
export const API_FILE_KEY = 'actionbar';
export const I18N_KEY = 'platformActionBar';

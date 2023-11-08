import { Routes } from '@angular/router';
import { PlatformActionListItemDocsComponent } from './platform-action-list-item-docs.component';
import { PlatformActionListItemHeaderComponent } from './platform-action-list-item-header/platform-action-list-item-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformActionListItemHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformActionListItemDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-list-item';
export const API_FILE_KEY = 'actionlistitem';

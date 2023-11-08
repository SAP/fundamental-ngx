import { Routes } from '@angular/router';
import { PlatformDisplayListItemDocsComponent } from './platform-display-list-item-docs.component';
import { PlatformDisplayListItemHeaderComponent } from './platform-display-list-item-header/platform-display-list-item-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDisplayListItemHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformDisplayListItemDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'display-list-item';
export const API_FILE_KEY = 'displaylistitem';

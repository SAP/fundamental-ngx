import { Routes } from '@angular/router';
import { PlatformObjectListItemDocsComponent } from './platform-object-list-item-docs.component';
import { PlatformObjectListItemHeaderComponent } from './platform-object-list-item-header/platform-object-list-item-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformObjectListItemHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformObjectListItemDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-list-item';
export const API_FILE_KEY = 'objectlistitem';
export const I18N_KEY = 'platformObjectListItem';

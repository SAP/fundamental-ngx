import { Routes } from '@angular/router';
import { FocusableItemDocsComponent } from './focusable-item-docs.component';
import { FocusableItemHeaderComponent } from './focusable-item-header/focusable-item-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FocusableItemHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableItemDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'focusable-item';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/cdk/utils';
export const API_FILE_KEY = 'focusableItem';

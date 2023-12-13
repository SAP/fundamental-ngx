import { Routes } from '@angular/router';
import { MessagePageDocsComponent } from './message-page-docs.component';
import { MessagePageHeaderComponent } from './message-page-header/message-page-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MessagePageHeaderComponent,
        children: [
            {
                path: '',
                component: MessagePageDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-page';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/message-page';
export const API_FILE_KEY = 'messagePage';

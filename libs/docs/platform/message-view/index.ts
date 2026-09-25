import { Routes } from '@angular/router';
import { MessageViewDocsComponent } from './message-view-docs.component';
import { MessageViewHeaderComponent } from './message-view-header/message-view-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MessageViewHeaderComponent,
        children: [
            {
                path: '',
                component: MessageViewDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-view';
export const API_FILE_KEY = 'messageView';
export const I18N_KEY = 'platformMessagePopover';

export * from './examples';
export * from './message-view-docs.component';
export * from './message-view-header/message-view-header.component';

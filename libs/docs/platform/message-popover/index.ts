import { Routes } from '@angular/router';
import { MessagePopoverDocsComponent } from './message-popover-docs.component';
import { MessagePopoverHeaderComponent } from './message-popover-header/message-popover-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MessagePopoverHeaderComponent,
        children: [
            {
                path: '',
                component: MessagePopoverDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-popover';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/platform/message-popover';
export const API_FILE_KEY = 'messagePopover';
export const I18N_KEY = 'platformMessagePopover';

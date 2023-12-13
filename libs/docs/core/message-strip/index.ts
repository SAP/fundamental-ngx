import { Routes } from '@angular/router';
import { MessageStripDocsComponent } from './message-strip-docs.component';
import { MessageStripHeaderComponent } from './message-strip-header/message-strip-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MessageStripHeaderComponent,
        children: [
            {
                path: '',
                component: MessageStripDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-strip';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/message-strip';
export const API_FILE_KEY = 'messageStrip';
export const I18N_KEY = 'coreMessageStrip';

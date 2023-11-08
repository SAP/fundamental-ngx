import { Routes } from '@angular/router';
import { MessageBoxDocsHeaderComponent } from './message-box-docs-header/message-box-docs-header.component';
import { MessageBoxDocsComponent } from './message-box-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MessageBoxDocsHeaderComponent,
        children: [
            {
                path: '',
                component: MessageBoxDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-box';
export const API_FILE_KEY = 'messageBox';

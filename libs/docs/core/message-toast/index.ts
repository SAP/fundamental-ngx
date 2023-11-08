import { Routes } from '@angular/router';
import { MessageToastDocsComponent } from './message-toast-docs.component';
import { MessageToastHeaderComponent } from './message-toast-header/message-toast-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MessageToastHeaderComponent,
        children: [
            {
                path: '',
                component: MessageToastDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'message-toast';
export const API_FILE_KEY = 'messageToast';

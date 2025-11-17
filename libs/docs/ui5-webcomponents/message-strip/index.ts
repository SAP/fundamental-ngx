import { Routes } from '@angular/router';
import { MessageStripHeader } from './header/message-strip-header';
import { MessageStripDocs } from './message-strip-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: MessageStripHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: MessageStripDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'message-strip';
export const API_FILE_KEY = 'messageStrip';

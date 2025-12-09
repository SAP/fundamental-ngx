import { Routes } from '@angular/router';
import { IllustratedMessageHeader } from './header/illustrated-message-header';
import { IllustratedMessageDocs } from './illustrated-message-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: IllustratedMessageHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: IllustratedMessageDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'illustrated-message';
export const API_FILE_KEY = 'illustratedMessage';

export * from './examples/illustrated-message-sample';
export * from './header/illustrated-message-header';
export * from './illustrated-message-docs';

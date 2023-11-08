import { Routes } from '@angular/router';
import { IllustratedMessageDocsComponent } from './illustrated-message-docs.component';
import { IllustratedMessageHeaderComponent } from './illustrated-message-header/illustrated-message-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: IllustratedMessageHeaderComponent,
        children: [
            {
                path: '',
                component: IllustratedMessageDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'illustrated-message';
export const API_FILE_KEY = 'illustratedMessage';

import { Routes } from '@angular/router';
import { TextAreaHeader } from './header/textarea-header';
import { TextAreaDocs } from './textarea-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TextAreaHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TextAreaDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'text-area';
export const API_FILE_KEY = 'textArea';

import { Routes } from '@angular/router';
import { DialogDocs } from './dialog-docs';
import { DialogHeader } from './header/dialog-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: DialogHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DialogDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'dialog';
export const API_FILE_KEY = 'dialog';

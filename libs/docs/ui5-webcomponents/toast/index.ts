import { Routes } from '@angular/router';
import { ToastHeader } from './header/toast-header';
import { ToastDocs } from './toast-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ToastHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ToastDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'toast';
export const API_FILE_KEY = 'toast';

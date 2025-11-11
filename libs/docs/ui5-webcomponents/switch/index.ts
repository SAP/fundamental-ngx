import { Routes } from '@angular/router';
import { SwitchHeader } from './header/switch-header';
import { SwitchDocs } from './switch-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: SwitchHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: SwitchDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'switch';
export const API_FILE_KEY = 'switch';

import { Routes } from '@angular/router';
import { PopoverHeaderDocs } from './header/popover-header';
import { PopoverDocs } from './popover-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: PopoverHeaderDocs,
        data: { primary: true },
        children: [
            {
                path: '',
                component: PopoverDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'popover';
export const API_FILE_KEY = 'popover';

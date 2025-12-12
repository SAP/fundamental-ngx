import { Routes } from '@angular/router';
import { MultiInputHeader } from './header/multi-input-header';
import { MultiInputDocs } from './multi-input-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: MultiInputHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: MultiInputDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'multi-input';
export const API_FILE_KEY = 'multiInput';

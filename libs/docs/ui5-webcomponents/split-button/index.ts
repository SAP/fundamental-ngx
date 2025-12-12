import { Routes } from '@angular/router';
import { SplitButtonHeader } from './header/split-button-header';
import { SplitButtonDocs } from './split-button-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: SplitButtonHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: SplitButtonDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'split-button';
export const API_FILE_KEY = 'splitButton';

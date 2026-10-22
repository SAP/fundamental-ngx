import { Routes } from '@angular/router';
import { NumericInputHeader } from './header/numeric-input-header';
import { NumericInputDocs } from './numeric-input-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: NumericInputHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: NumericInputDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'numeric-input';
export const API_FILE_KEY = 'numericInput';

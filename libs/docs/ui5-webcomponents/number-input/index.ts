import { Routes } from '@angular/router';
import { NumberInputHeader } from './header/number-input-header';
import { NumberInputDocs } from './number-input-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: NumberInputHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: NumberInputDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'number-input';
export const API_FILE_KEY = 'numberInput';

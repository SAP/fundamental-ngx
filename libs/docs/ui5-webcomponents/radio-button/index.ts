import { Routes } from '@angular/router';
import { RadioButtonHeader } from './header/radio-button-header';
import { RadioButtonDocs } from './radio-button-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: RadioButtonHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: RadioButtonDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'radio-button';
export const API_FILE_KEY = 'radioButton';

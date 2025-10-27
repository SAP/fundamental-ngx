import { Routes } from '@angular/router';
import { CheckBoxDocs } from './checkbox-docs';
import { CheckBoxHeader } from './header/checkbox-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: CheckBoxHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: CheckBoxDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'check-box';
export const API_FILE_KEY = 'checkBox';

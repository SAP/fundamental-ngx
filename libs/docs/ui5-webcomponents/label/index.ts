import { Routes } from '@angular/router';
import { LabelHeader } from './header/label-header';
import { LabelDocs } from './label-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: LabelHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: LabelDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'label';
export const API_FILE_KEY = 'label';

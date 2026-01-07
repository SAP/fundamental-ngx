import { Routes } from '@angular/router';
import { ComboBoxDocs } from './combo-box-docs';
import { ComboBoxHeader } from './header/combo-box-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: ComboBoxHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ComboBoxDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'combo-box';
export const API_FILE_KEY = 'comboBox';

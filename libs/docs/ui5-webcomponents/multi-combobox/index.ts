import { Routes } from '@angular/router';
import { MultiComboBoxHeader } from './header/multi-combobox-header';
import { MultiComboBoxDocs } from './multi-combobox-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: MultiComboBoxHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: MultiComboBoxDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'multi-combobox';
export const API_FILE_KEY = 'multiComboBox';

import { Routes } from '@angular/router';
import { ComboboxDocsComponent } from './combobox-docs.component';
import { ComboboxHeaderComponent } from './combobox-header/combobox-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ComboboxHeaderComponent,
        children: [
            {
                path: '',
                component: ComboboxDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'combobox';
export const API_FILE_KEY = 'combobox';

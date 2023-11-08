import { Routes } from '@angular/router';
import { PlatformComboboxDocsComponent } from './platform-combobox-docs.component';
import { PlatformComboboxHeaderComponent } from './platform-combobox-header/platform-combobox-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformComboboxHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformComboboxDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'combobox';
export const API_FILE_KEY = 'combobox';
export const I18N_KEY = 'platformCombobox';

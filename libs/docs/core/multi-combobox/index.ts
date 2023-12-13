import { Routes } from '@angular/router';
import { MultiComboboxDocsComponent } from './multi-combobox-docs.component';
import { MultiComboboxHeaderComponent } from './multi-combobox-header/multi-combobox-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MultiComboboxHeaderComponent,
        children: [
            {
                path: '',
                component: MultiComboboxDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-combobox';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/multi-combobox';
export const API_FILE_KEY = 'multiCombobox';
export const I18N_KEY = 'coreMultiComboBox';

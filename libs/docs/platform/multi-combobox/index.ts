import { Routes } from '@angular/router';
import { PlatformMultiComboboxDocsComponent } from './platform-multi-combobox-docs.component';
import { PlatformMultiComboboxHeaderComponent } from './platform-multi-combobox-header/platform-multi-combobox-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformMultiComboboxHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformMultiComboboxDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-combobox';
export const API_FILE_KEY = 'multiCombobox';
export const I18N_KEY = 'platformMultiCombobox';

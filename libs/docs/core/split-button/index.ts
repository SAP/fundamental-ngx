import { Routes } from '@angular/router';
import { SplitButtonDocsComponent } from './split-button-docs.component';
import { SplitButtonHeaderComponent } from './split-button-header/split-button-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SplitButtonHeaderComponent,
        children: [
            {
                path: '',
                component: SplitButtonDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'split-button';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/split-button';
export const API_FILE_KEY = 'splitButton';
export const I18N_KEY = 'coreSplitButton';

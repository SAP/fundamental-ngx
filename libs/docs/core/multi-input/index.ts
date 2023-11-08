import { Routes } from '@angular/router';
import { MultiInputDocsComponent } from './multi-input-docs.component';
import { MultiInputHeaderComponent } from './multi-input-header/multi-input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MultiInputHeaderComponent,
        children: [
            {
                path: '',
                component: MultiInputDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-input';
export const API_FILE_KEY = 'multiInput';
export const I18N_KEY = 'coreMultiInput';

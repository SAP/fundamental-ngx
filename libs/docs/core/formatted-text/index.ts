import { Routes } from '@angular/router';
import { FormattedTextDocsComponent } from './formatted-text-docs.component';
import { FormattedTextHeaderComponent } from './formatted-text-header/formatted-text-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FormattedTextHeaderComponent,
        children: [
            {
                path: '',
                component: FormattedTextDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'formatted-text';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/formatted-text';
export const API_FILE_KEY = 'formattedText';

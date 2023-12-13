import { Routes } from '@angular/router';
import { TruncateDocsHeaderComponent } from './truncate-docs-header/truncate-docs-header.component';
import { TruncateDocsComponent } from './truncate-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TruncateDocsHeaderComponent,
        children: [
            {
                path: '',
                component: TruncateDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'truncate';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/cdk/utils';
export const API_FILE_KEY = 'truncate';

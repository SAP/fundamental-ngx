import { Routes } from '@angular/router';
import { QuickViewDocsHeaderComponent } from './quick-view-docs-header/quick-view-docs-header.component';
import { QuickViewDocsComponent } from './quick-view-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: QuickViewDocsHeaderComponent,
        children: [
            {
                path: '',
                component: QuickViewDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'quick-view';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/quick-view';
export const API_FILE_KEY = 'quickView';

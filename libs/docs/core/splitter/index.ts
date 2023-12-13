import { Routes } from '@angular/router';
import { SplitterDocsComponent } from './splitter-docs.component';
import { SplitterHeaderComponent } from './splitter-header/splitter-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SplitterHeaderComponent,
        children: [
            {
                path: '',
                component: SplitterDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'splitter';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/splitter';
export const API_FILE_KEY = 'splitter';
export const I18N_KEY = 'coreSplitter';

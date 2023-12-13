import { Routes } from '@angular/router';
import { ShellbarDocsHeaderComponent } from './shellbar-docs-header/shellbar-docs-header.component';
import { ShellbarDocsComponent } from './shellbar-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ShellbarDocsHeaderComponent,
        children: [
            {
                path: '',
                component: ShellbarDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'shellbar';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/shellbar';
export const API_FILE_KEY = 'shellbar';
export const I18N_KEY = 'coreShellbar';

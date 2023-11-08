import { Routes } from '@angular/router';
import { FdLanguage } from '@fundamental-ngx/i18n';
import { TokenDocsComponent } from './token-docs.component';
import { TokenHeaderComponent } from './token-header/token-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TokenHeaderComponent,
        children: [
            {
                path: '',
                component: TokenDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'token';
export const API_FILE_KEY = 'token';
export const I18N_KEY = ['coreToken', 'coreTokenizer'] as Array<keyof FdLanguage>;

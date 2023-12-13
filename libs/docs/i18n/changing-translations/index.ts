import { Routes } from '@angular/router';
import { ChangingTranslationsDocsComponent } from './changing-translations-docs.component';
import { ChangingTranslationsHeaderComponent } from './changing-translations-header/changing-translations-header.component';

export const LIBRARY_NAME = 'changing-translations';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/i18n';
export const ROUTES: Routes = [
    {
        path: '',
        component: ChangingTranslationsHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ChangingTranslationsDocsComponent
            }
        ]
    }
];

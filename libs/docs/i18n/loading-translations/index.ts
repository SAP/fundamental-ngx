import { Routes } from '@angular/router';
import { LoadingTranslationsDocsComponent } from './loading-translations-docs.component';
import { LoadingTranslationsHeaderComponent } from './loading-translations-header/loading-translations-header.component';

export const LIBRARY_NAME = 'loading-translations';
export const ROUTES: Routes = [
    {
        path: '',
        component: LoadingTranslationsHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: LoadingTranslationsDocsComponent
            }
        ]
    }
];

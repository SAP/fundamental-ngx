import { Routes } from '@angular/router';
import { TranslationResolverDocsComponent } from './translation-resolver-docs.component';
import { TranslationResolverHeaderComponent } from './translation-resolver-header/translation-resolver-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TranslationResolverHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TranslationResolverDocsComponent
            }
        ]
    }
];

export const LIBRARY_NAME = 'translation-resolver';

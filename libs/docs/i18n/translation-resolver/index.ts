import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./translation-resolver-header/translation-resolver-header.component').then(
                (c) => c.TranslationResolverHeaderComponent
            ),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./translation-resolver-docs.component').then((c) => c.TranslationResolverDocsComponent)
            }
        ]
    }
];

export const LIBRARY_NAME = 'translation-resolver';

import { Routes } from '@angular/router';

export const LIBRARY_NAME = 'changing-translations';
export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./changing-translations-header/changing-translations-header.component').then(
                (c) => c.ChangingTranslationsHeaderComponent
            ),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./changing-translations-docs.component').then((c) => c.ChangingTranslationsDocsComponent)
            }
        ]
    }
];

import { Routes } from '@angular/router';

export const LIBRARY_NAME = 'loading-translations';
export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./loading-translations-header/loading-translations-header.component').then(
                (c) => c.LoadingTranslationsHeaderComponent
            ),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./loading-translations-docs.component').then((c) => c.LoadingTranslationsDocsComponent)
            }
        ]
    }
];

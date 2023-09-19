import { Routes } from '@angular/router';

export const LIBRARY_NAME = 'patching-translations';
export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./patching-translations-header/patching-translations-header.component').then(
                (c) => c.PatchingTranslationsHeaderComponent
            ),
        data: { primary: true },
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./patching-translations-docs.component').then((c) => c.PatchingTranslationsDocsComponent)
            }
        ]
    }
];

import { Routes } from '@angular/router';
import { configureRoutes, CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { sections } from './docs-data';

const configureI18nRoutes = configureRoutes({});

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryDocShellPageComponent),
        data: {
            sections
        },
        providers: [StackblitzService, { provide: CURRENT_LIB, useValue: 'i18n' }],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () =>
                    import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryReadmePageComponent)
            },
            {
                path: 'writing-translations',
                loadComponent: () =>
                    import('./writing-translations.component').then((m) => m.WritingTranslationsComponent)
            },
            {
                path: 'loading-translations',
                loadChildren: () => import('./loading-translations').then(configureI18nRoutes)
            },
            {
                path: 'changing-translations',
                loadChildren: () => import('./changing-translations').then(configureI18nRoutes)
            },
            {
                path: 'resolver',
                loadChildren: () => import('./translation-resolver').then(configureI18nRoutes)
            },
            {
                path: 'patch',
                loadChildren: () => import('./patching-translations').then(configureI18nRoutes)
            }
        ]
    }
];

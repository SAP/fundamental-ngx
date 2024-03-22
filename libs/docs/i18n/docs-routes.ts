import { Routes } from '@angular/router';
import { configureRoutes, CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { guides, utilities } from './docs-data.json';

const configureLibRoutes = configureRoutes({});

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryDocShellPageComponent),
        data: {
            sections: [
                {
                    header: 'Guides',
                    content: guides
                },
                {
                    header: 'Utilities',
                    content: utilities
                }
            ]
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
                loadChildren: () => import('./loading-translations').then(configureLibRoutes)
            },
            {
                path: 'changing-translations',
                loadChildren: () => import('./changing-translations').then(configureLibRoutes)
            },
            {
                path: 'resolver',
                loadChildren: () => import('./translation-resolver').then(configureLibRoutes)
            },
            {
                path: 'patch',
                loadChildren: () => import('./patching-translations').then(configureLibRoutes)
            }
        ]
    }
];

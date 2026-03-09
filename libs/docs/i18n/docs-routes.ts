import { Routes } from '@angular/router';
import { configureRoutes, CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { guides } from './docs-data.json';

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
                }
            ]
        },
        providers: [StackblitzService, { provide: CURRENT_LIB, useValue: 'i18n' }],
        children: [
            { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () =>
                    import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryReadmePageComponent)
            },
            {
                path: 'getting-started',
                loadChildren: () => import('./getting-started').then(configureLibRoutes)
            },
            {
                path: 'writing-translations',
                loadComponent: () =>
                    import('./writing-translations.component').then((m) => m.WritingTranslationsComponent)
            },
            {
                path: 'troubleshooting',
                loadChildren: () => import('./troubleshooting').then(configureLibRoutes)
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

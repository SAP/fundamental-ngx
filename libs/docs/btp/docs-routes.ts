import { Routes } from '@angular/router';
import { configureRoutes, CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { API_FILES } from './api-files';
import { components, guides } from './docs-data.json';

const configureLibRoutes = configureRoutes(API_FILES);

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
const componentRoutes = [
    {
        path: 'button',
        loadChildren: () => import('@fundamental-ngx/docs/btp/button').then(configureLibRoutes)
    },
    {
        path: 'splitter',
        loadChildren: () => import('@fundamental-ngx/docs/btp/splitter').then(configureLibRoutes)
    },
    {
        path: 'navigation',
        loadChildren: () => import('@fundamental-ngx/docs/btp/navigation').then(configureLibRoutes)
    },
    {
        path: 'tool-header',
        loadChildren: () => import('@fundamental-ngx/docs/btp/tool-header').then(configureLibRoutes)
    },
    {
        path: 'tool-layout',
        loadChildren: () => import('@fundamental-ngx/docs/btp/tool-layout').then(configureLibRoutes)
    },
    {
        path: 'search-field',
        loadChildren: () => import('@fundamental-ngx/docs/btp/search-field').then(configureLibRoutes)
    }
];

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
                    header: 'Components',
                    content: components
                }
            ]
        },
        providers: [
            // @todo Needs schema module!
            StackblitzService,
            { provide: CURRENT_LIB, useValue: 'btp' }
        ],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () =>
                    import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryReadmePageComponent)
            },
            {
                path: 'new-component',
                loadComponent: () =>
                    import('@fundamental-ngx/docs/shared-pages').then((m) => m.NewComponentPageComponent)
            },
            ...componentRoutes
        ]
    }
];

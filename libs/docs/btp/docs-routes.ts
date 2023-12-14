import { Routes } from '@angular/router';
import { configureRoutes, CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { API_FILES } from './api-files';
import { sections } from './docs-data';

const configureBtpRoutes = configureRoutes(API_FILES);

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryDocShellPageComponent),
        data: {
            sections
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
            {
                path: 'button',
                loadChildren: () => import('@fundamental-ngx/docs/btp/button').then(configureBtpRoutes)
            },
            {
                path: 'navigation',
                loadChildren: () => import('@fundamental-ngx/docs/btp/navigation').then(configureBtpRoutes)
            },
            {
                path: 'search-field',
                loadChildren: () => import('@fundamental-ngx/docs/btp/search-field').then(configureBtpRoutes)
            },
            {
                path: 'tool-header',
                loadChildren: () => import('@fundamental-ngx/docs/btp/tool-header').then(configureBtpRoutes)
            },
            {
                path: 'tool-layout',
                loadChildren: () => import('@fundamental-ngx/docs/btp/tool-layout').then(configureBtpRoutes)
            },
            {
                path: 'user-menu',
                loadChildren: () => import('@fundamental-ngx/docs/btp/user-menu').then(configureBtpRoutes)
            }
        ]
    }
];

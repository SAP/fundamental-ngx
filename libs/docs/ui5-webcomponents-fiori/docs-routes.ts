import { Routes } from '@angular/router';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import {
    COMBOBOX_MOBILE_CONFIG,
    configureRoutes,
    CURRENT_LIB,
    MENU_MOBILE_CONFIG,
    MULTI_INPUT_MOBILE_CONFIG,
    POPOVER_MOBILE_CONFIG,
    SEARCH_FIELD_MOBILE_CONFIG,
    SELECT_MOBILE_CONFIG,
    StackblitzService
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from './api-files';
import { components, guides } from './docs-data.json';

const configureLibRoutes = configureRoutes(API_FILES);

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
const componentRoutes = [
    {
        path: 'barcode-scanner-dialog',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/barcode-scanner-dialog').then(configureLibRoutes)
    },
    {
        path: 'dynamic-page',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/dynamic-page').then(configureLibRoutes)
    },
    {
        path: 'dynamic-side-content',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/dynamic-side-content').then(configureLibRoutes)
    },
    {
        path: 'flexible-column-layout',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/flexible-column-layout').then(configureLibRoutes)
    },
    {
        path: 'illustrated-message',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/illustrated-message').then(configureLibRoutes)
    },
    {
        path: 'media-gallery',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/media-gallery').then(configureLibRoutes)
    },
    {
        path: 'navigation-layout',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/navigation-layout').then(configureLibRoutes)
    },
    {
        path: 'notification-list',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/notification-list').then(configureLibRoutes)
    },
    {
        path: 'page',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents-fiori/page').then(configureLibRoutes)
    },
    {
        path: 'product-switch',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/product-switch').then(configureLibRoutes)
    },
    {
        path: 'search',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents-fiori/search').then(configureLibRoutes)
    },
    {
        path: 'shellbar',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents-fiori/shellbar').then(configureLibRoutes)
    },
    {
        path: 'side-navigation',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/side-navigation').then(configureLibRoutes)
    },
    {
        path: 'timeline',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents-fiori/timeline').then(configureLibRoutes)
    },
    {
        path: 'upload-collection',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/upload-collection').then(configureLibRoutes)
    },
    {
        path: 'user-menu',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents-fiori/user-menu').then(configureLibRoutes)
    },
    {
        path: 'user-settings-dialog',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents-fiori/user-settings-dialog').then(configureLibRoutes)
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
            // @todo needs schema module
            StackblitzService,
            { provide: CURRENT_LIB, useValue: 'ui5-webcomponents-fiori' },
            { provide: MOBILE_MODE_CONFIG, useValue: MENU_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: SELECT_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: COMBOBOX_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: POPOVER_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: SEARCH_FIELD_MOBILE_CONFIG, multi: true }
        ],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () =>
                    import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryReadmePageComponent)
            },
            ...componentRoutes
        ]
    }
];

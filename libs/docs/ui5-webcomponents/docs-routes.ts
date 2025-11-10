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
        path: 'avatar',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/avatar').then(configureLibRoutes)
    },
    {
        path: 'avatar-group',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/avatar-group').then(configureLibRoutes)
    },
    {
        path: 'bar',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/bar').then(configureLibRoutes)
    },
    {
        path: 'busy-indicator',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/busy-indicator').then(configureLibRoutes)
    },
    {
        path: 'button',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/button').then(configureLibRoutes)
    },
    {
        path: 'calendar',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/calendar').then(configureLibRoutes)
    },
    {
        path: 'calendar-legend',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/calendar-legend').then(configureLibRoutes)
    },
    {
        path: 'card',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/card').then(configureLibRoutes)
    },
    {
        path: 'carousel',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/carousel').then(configureLibRoutes)
    },
    {
        path: 'check-box',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/check-box').then(configureLibRoutes)
    },
    {
        path: 'color-palette',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/color-palette').then(configureLibRoutes)
    },
    {
        path: 'color-picker',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/color-picker').then(configureLibRoutes)
    },
    {
        path: 'expandable-text',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/expandable-text').then(configureLibRoutes)
    },
    {
        path: 'form',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/form').then(configureLibRoutes)
    },
    {
        path: 'icon',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/icon').then(configureLibRoutes)
    },
    {
        path: 'input',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/input').then(configureLibRoutes)
    },
    {
        path: 'label',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/label').then(configureLibRoutes)
    },
    {
        path: 'link',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/link').then(configureLibRoutes)
    },
    {
        path: 'list',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/list').then(configureLibRoutes)
    },
    {
        path: 'message-strip',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/message-strip').then(configureLibRoutes)
    },
    {
        path: 'panel',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/panel').then(configureLibRoutes)
    },
    {
        path: 'popover',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/popover').then(configureLibRoutes)
    },
    {
        path: 'progress-indicator',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents/progress-indicator').then(configureLibRoutes)
    },
    {
        path: 'segmented-button',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/segmented-button').then(configureLibRoutes)
    },
    {
        path: 'slider',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/slider').then(configureLibRoutes)
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
            { provide: CURRENT_LIB, useValue: 'ui5-webcomponents' },
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

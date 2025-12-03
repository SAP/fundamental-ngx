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
        path: 'breadcrumbs',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/breadcrumbs').then(configureLibRoutes)
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
        path: 'color-palette-popover',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents/color-palette-popover').then(configureLibRoutes)
    },
    {
        path: 'color-picker',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/color-picker').then(configureLibRoutes)
    },
    {
        path: 'combo-box',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/combo-box').then(configureLibRoutes)
    },
    {
        path: 'date-picker',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/date-picker').then(configureLibRoutes)
    },
    {
        path: 'date-range-picker',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/date-range-picker').then(configureLibRoutes)
    },
    {
        path: 'date-time-picker',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/date-time-picker').then(configureLibRoutes)
    },
    {
        path: 'dialog',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/dialog').then(configureLibRoutes)
    },
    {
        path: 'dynamic-date-range',
        loadChildren: () =>
            import('@fundamental-ngx/docs/ui5-webcomponents/dynamic-date-range').then(configureLibRoutes)
    },
    {
        path: 'expandable-text',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/expandable-text').then(configureLibRoutes)
    },
    {
        path: 'file-uploader',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/file-uploader').then(configureLibRoutes)
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
        path: 'menu',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/menu').then(configureLibRoutes)
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
        path: 'radio-button',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/radio-button').then(configureLibRoutes)
    },
    {
        path: 'rating-indicator',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/rating-indicator').then(configureLibRoutes)
    },
    {
        path: 'segmented-button',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/segmented-button').then(configureLibRoutes)
    },
    {
        path: 'slider',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/slider').then(configureLibRoutes)
    },
    {
        path: 'step-input',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/step-input').then(configureLibRoutes)
    },
    {
        path: 'switch',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/switch').then(configureLibRoutes)
    },
    {
        path: 'tag',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/tag').then(configureLibRoutes)
    },
    {
        path: 'text',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/text').then(configureLibRoutes)
    },
    {
        path: 'text-area',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/text-area').then(configureLibRoutes)
    },
    {
        path: 'time-picker',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/time-picker').then(configureLibRoutes)
    },
    {
        path: 'title',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/title').then(configureLibRoutes)
    },
    {
        path: 'toast',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/toast').then(configureLibRoutes)
    },
    {
        path: 'toggle-button',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/toggle-button').then(configureLibRoutes)
    },
    {
        path: 'token',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/token').then(configureLibRoutes)
    },
    {
        path: 'tokenizer',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/tokenizer').then(configureLibRoutes)
    },
    {
        path: 'toolbar',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/toolbar').then(configureLibRoutes)
    },
    {
        path: 'tree',
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents/tree').then(configureLibRoutes)
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

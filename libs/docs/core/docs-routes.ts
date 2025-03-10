import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import { CoreSchemaModule } from '@fundamental-ngx/docs/core/schema';

import {
    COMBOBOX_MOBILE_CONFIG,
    configureRoutes,
    CURRENT_LIB,
    DATE_PICKER_MOBILE_CONFIG,
    MENU_MOBILE_CONFIG,
    MULTI_INPUT_MOBILE_CONFIG,
    POPOVER_MOBILE_CONFIG,
    SEARCH_FIELD_MOBILE_CONFIG,
    SELECT_MOBILE_CONFIG,
    StackblitzService
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from './api-files';
import { adapters, components, guides, layouts, utilities } from './docs-data.json';
const configureLibRoutes = configureRoutes(API_FILES);
const componentRoutes = [
    {
        path: 'action-bar',
        loadChildren: () => import('@fundamental-ngx/docs/core/action-bar').then(configureLibRoutes)
    },
    {
        path: 'action-sheet',
        loadChildren: () => import('@fundamental-ngx/docs/core/action-sheet').then(configureLibRoutes)
    },
    {
        path: 'avatar',
        loadChildren: () => import('@fundamental-ngx/docs/core/avatar').then(configureLibRoutes)
    },
    {
        path: 'avatar-group-legacy',
        loadChildren: () => import('@fundamental-ngx/docs/core/avatar-group-legacy').then(configureLibRoutes)
    },
    {
        path: 'bar',
        loadChildren: () => import('@fundamental-ngx/docs/core/bar').then(configureLibRoutes)
    },
    {
        path: 'breadcrumb',
        loadChildren: () => import('@fundamental-ngx/docs/core/breadcrumb').then(configureLibRoutes)
    },
    {
        path: 'busy-indicator',
        loadChildren: () => import('@fundamental-ngx/docs/core/busy-indicator').then(configureLibRoutes)
    },
    {
        path: 'button',
        loadChildren: () => import('@fundamental-ngx/docs/core/button').then(configureLibRoutes)
    },
    {
        path: 'card',
        loadChildren: () => import('@fundamental-ngx/docs/core/card').then(configureLibRoutes)
    },
    {
        path: 'segmented-button',
        loadChildren: () => import('@fundamental-ngx/docs/core/segmented-button').then(configureLibRoutes)
    },
    {
        path: 'calendar',
        loadChildren: () => import('@fundamental-ngx/docs/core/calendar').then(configureLibRoutes)
    },
    {
        path: 'carousel',
        loadChildren: () => import('@fundamental-ngx/docs/core/carousel').then(configureLibRoutes)
    },
    {
        path: 'checkbox',
        loadChildren: () => import('@fundamental-ngx/docs/core/checkbox').then(configureLibRoutes)
    },
    {
        path: 'combobox',
        loadChildren: () => import('@fundamental-ngx/docs/core/combobox').then(configureLibRoutes)
    },
    {
        path: 'date-picker',
        loadChildren: () => import('@fundamental-ngx/docs/core/date-picker').then(configureLibRoutes)
    },
    {
        path: 'datetime-picker',
        loadChildren: () => import('@fundamental-ngx/docs/core/datetime-picker').then(configureLibRoutes)
    },
    {
        path: 'dialog',
        loadChildren: () => import('@fundamental-ngx/docs/core/dialog').then(configureLibRoutes)
    },
    {
        path: 'dynamic-page',
        loadChildren: () => import('@fundamental-ngx/docs/core/dynamic-page').then(configureLibRoutes)
    },
    {
        path: 'object-attribute',
        loadChildren: () => import('@fundamental-ngx/docs/core/object-attribute').then(configureLibRoutes)
    },
    {
        path: 'object-page',
        loadChildren: () => import('@fundamental-ngx/docs/core/object-page').then(configureLibRoutes)
    },
    {
        path: 'facets',
        loadChildren: () => import('@fundamental-ngx/docs/core/facets').then(configureLibRoutes)
    },
    {
        path: 'feed-list-item',
        loadChildren: () => import('@fundamental-ngx/docs/core/feed-list-item').then(configureLibRoutes)
    },
    {
        path: 'dynamic-side-content',
        loadChildren: () => import('@fundamental-ngx/docs/core/dynamic-side-content').then(configureLibRoutes)
    },
    {
        path: 'feed-input',
        loadChildren: () => import('@fundamental-ngx/docs/core/feed-input').then(configureLibRoutes)
    },
    {
        path: 'file-uploader',
        loadChildren: () => import('@fundamental-ngx/docs/core/file-uploader').then(configureLibRoutes)
    },
    {
        path: 'fixed-card-layout',
        loadChildren: () => import('@fundamental-ngx/docs/core/fixed-card-layout').then(configureLibRoutes)
    },
    {
        path: 'flexible-column-layout',
        loadChildren: () => import('@fundamental-ngx/docs/core/flexible-column-layout').then(configureLibRoutes)
    },
    {
        path: 'form-message',
        loadChildren: () => import('@fundamental-ngx/docs/core/form-message').then(configureLibRoutes)
    },
    {
        path: 'formatted-text',
        loadChildren: () => import('@fundamental-ngx/docs/core/formatted-text').then(configureLibRoutes)
    },
    {
        path: 'global-config',
        loadChildren: () => import('@fundamental-ngx/docs/core/global-config').then(configureLibRoutes)
    },
    {
        path: 'generic-tag',
        loadChildren: () => import('@fundamental-ngx/docs/core/generic-tag').then(configureLibRoutes)
    },
    {
        path: 'content-density',
        loadChildren: () => import('@fundamental-ngx/docs/core/content-density').then(configureLibRoutes)
    },
    {
        path: 'truncate',
        loadChildren: () => import('@fundamental-ngx/docs/core/truncate').then(configureLibRoutes)
    },
    {
        path: 'grid-list',
        loadChildren: () => import('@fundamental-ngx/docs/core/grid-list').then(configureLibRoutes)
    },
    {
        path: 'icon',
        loadChildren: () => import('@fundamental-ngx/docs/core/icon').then(configureLibRoutes)
    },
    {
        path: 'illustrated-message',
        loadChildren: () => import('@fundamental-ngx/docs/core/illustrated-message').then(configureLibRoutes)
    },
    {
        path: 'info-label',
        loadChildren: () => import('@fundamental-ngx/docs/core/info-label').then(configureLibRoutes)
    },
    {
        path: 'infinite-scroll',
        loadChildren: () => import('@fundamental-ngx/docs/core/infinite-scroll').then(configureLibRoutes)
    },
    {
        path: 'inline-help',
        loadChildren: () => import('@fundamental-ngx/docs/core/inline-help').then(configureLibRoutes)
    },
    {
        path: 'input',
        loadChildren: () => import('@fundamental-ngx/docs/core/input').then(configureLibRoutes)
    },
    {
        path: 'input-group',
        loadChildren: () => import('@fundamental-ngx/docs/core/input-group').then(configureLibRoutes)
    },
    {
        path: 'layout-grid',
        loadChildren: () => import('@fundamental-ngx/docs/core/layout-grid').then(configureLibRoutes)
    },
    {
        path: 'layout-panel',
        loadChildren: () => import('@fundamental-ngx/docs/core/layout-panel').then(configureLibRoutes)
    },
    {
        path: 'link',
        loadChildren: () => import('@fundamental-ngx/docs/core/link').then(configureLibRoutes)
    },
    {
        path: 'list',
        loadChildren: () => import('@fundamental-ngx/docs/core/list').then(configureLibRoutes)
    },
    {
        path: 'list-byline',
        loadChildren: () => import('@fundamental-ngx/docs/core/list-byline').then(configureLibRoutes)
    },
    {
        path: 'list-subline',
        loadChildren: () => import('@fundamental-ngx/docs/core/list-subline').then(configureLibRoutes)
    },
    {
        path: 'menu',
        loadChildren: () => import('@fundamental-ngx/docs/core/menu').then(configureLibRoutes)
    },
    {
        path: 'message-strip',
        loadChildren: () => import('@fundamental-ngx/docs/core/message-strip').then(configureLibRoutes)
    },
    {
        path: 'message-box',
        loadChildren: () => import('@fundamental-ngx/docs/core/message-box').then(configureLibRoutes)
    },
    {
        path: 'message-page',
        loadChildren: () => import('@fundamental-ngx/docs/core/message-page').then(configureLibRoutes)
    },
    {
        path: 'message-toast',
        loadChildren: () => import('@fundamental-ngx/docs/core/message-toast').then(configureLibRoutes)
    },
    {
        path: 'micro-process-flow',
        loadChildren: () => import('@fundamental-ngx/docs/core/micro-process-flow').then(configureLibRoutes)
    },
    {
        path: 'multi-input',
        loadChildren: () => import('@fundamental-ngx/docs/core/multi-input').then(configureLibRoutes)
    },
    {
        path: 'notification',
        loadChildren: () => import('@fundamental-ngx/docs/core/notification').then(configureLibRoutes)
    },
    {
        path: 'object-identifier',
        loadChildren: () => import('@fundamental-ngx/docs/core/object-identifier').then(configureLibRoutes)
    },
    {
        path: 'object-marker',
        loadChildren: () => import('@fundamental-ngx/docs/core/object-marker').then(configureLibRoutes)
    },
    {
        path: 'object-number',
        loadChildren: () => import('@fundamental-ngx/docs/core/object-number').then(configureLibRoutes)
    },
    {
        path: 'object-status',
        loadChildren: () => import('@fundamental-ngx/docs/core/object-status').then(configureLibRoutes)
    },
    {
        path: 'pagination',
        loadChildren: () => import('@fundamental-ngx/docs/core/pagination').then(configureLibRoutes)
    },
    {
        path: 'panel',
        loadChildren: () => import('@fundamental-ngx/docs/core/panel').then(configureLibRoutes)
    },
    {
        path: 'popover',
        loadChildren: () => import('@fundamental-ngx/docs/core/popover').then(configureLibRoutes)
    },
    {
        path: 'product-switch',
        loadChildren: () => import('@fundamental-ngx/docs/core/product-switch').then(configureLibRoutes)
    },
    {
        path: 'progress-indicator',
        loadChildren: () => import('@fundamental-ngx/docs/core/progress-indicator').then(configureLibRoutes)
    },
    {
        path: 'quick-view',
        loadChildren: () => import('@fundamental-ngx/docs/core/quick-view').then(configureLibRoutes)
    },
    {
        path: 'radio',
        loadChildren: () => import('@fundamental-ngx/docs/core/radio').then(configureLibRoutes)
    },
    {
        path: 'rating-indicator',
        loadChildren: () => import('@fundamental-ngx/docs/core/rating-indicator').then(configureLibRoutes)
    },
    {
        path: 'resizable-card-layout',
        loadChildren: () => import('@fundamental-ngx/docs/core/resizable-card-layout').then(configureLibRoutes)
    },
    {
        path: 'scroll-spy',
        loadChildren: () => import('@fundamental-ngx/docs/core/scroll-spy').then(configureLibRoutes)
    },
    {
        path: 'shellbar',
        loadChildren: () => import('@fundamental-ngx/docs/core/shellbar').then(configureLibRoutes)
    },
    {
        path: 'side-navigation',
        loadChildren: () => import('@fundamental-ngx/docs/core/side-navigation').then(configureLibRoutes)
    },
    {
        path: 'select',
        loadChildren: () => import('@fundamental-ngx/docs/core/select').then(configureLibRoutes)
    },
    {
        path: 'slider',
        loadChildren: () => import('@fundamental-ngx/docs/core/slider').then(configureLibRoutes)
    },
    {
        path: 'split-button',
        loadChildren: () => import('@fundamental-ngx/docs/core/split-button').then(configureLibRoutes)
    },
    {
        path: 'status-indicator',
        loadChildren: () => import('@fundamental-ngx/docs/core/status-indicator').then(configureLibRoutes)
    },
    {
        path: 'step-input',
        loadChildren: () => import('@fundamental-ngx/docs/core/step-input').then(configureLibRoutes)
    },
    {
        path: 'switch',
        loadChildren: () => import('@fundamental-ngx/docs/core/switch').then(configureLibRoutes)
    },
    {
        path: 'table',
        loadChildren: () => import('@fundamental-ngx/docs/core/table').then(configureLibRoutes)
    },
    {
        path: 'tabs',
        loadChildren: () => import('@fundamental-ngx/docs/core/tabs').then(configureLibRoutes)
    },
    {
        path: 'text',
        loadChildren: () => import('@fundamental-ngx/docs/core/text').then(configureLibRoutes)
    },
    {
        path: 'textarea',
        loadChildren: () => import('@fundamental-ngx/docs/core/textarea').then(configureLibRoutes)
    },
    {
        path: 'theming',
        loadChildren: () => import('@fundamental-ngx/docs/core/theming').then(configureLibRoutes)
    },
    {
        path: 'tile',
        loadChildren: () => import('@fundamental-ngx/docs/core/tile').then(configureLibRoutes)
    },
    {
        path: 'time',
        loadChildren: () => import('@fundamental-ngx/docs/core/time').then(configureLibRoutes)
    },
    {
        path: 'time-picker',
        loadChildren: () => import('@fundamental-ngx/docs/core/time-picker').then(configureLibRoutes)
    },
    {
        path: 'title',
        loadChildren: () => import('@fundamental-ngx/docs/core/title').then(configureLibRoutes)
    },
    {
        path: 'token',
        loadChildren: () => import('@fundamental-ngx/docs/core/token').then(configureLibRoutes)
    },
    {
        path: 'toolbar',
        loadChildren: () => import('@fundamental-ngx/docs/core/toolbar').then(configureLibRoutes)
    },
    {
        path: 'tree',
        loadChildren: () => import('@fundamental-ngx/docs/core/tree').then(configureLibRoutes)
    },
    {
        path: 'user-menu',
        loadChildren: () => import('@fundamental-ngx/docs/core/user-menu').then(configureLibRoutes)
    },
    {
        path: 'vertical-navigation',
        loadChildren: () => import('@fundamental-ngx/docs/core/vertical-navigation').then(configureLibRoutes)
    },
    {
        path: 'upload-collection',
        loadChildren: () => import('@fundamental-ngx/docs/core/upload-collection').then(configureLibRoutes)
    },
    {
        path: 'wizard',
        loadChildren: () => import('@fundamental-ngx/docs/core/wizard').then(configureLibRoutes)
    },
    {
        path: 'moment-datetime-adapter',
        loadChildren: () => import('@fundamental-ngx/docs/core/moment-datetime-adapter').then(configureLibRoutes)
    },
    {
        path: 'dayjs-datetime-adapter',
        loadChildren: () => import('@fundamental-ngx/docs/core/dayjs-datetime-adapter').then(configureLibRoutes)
    },
    {
        path: 'timeline',
        loadChildren: () => import('@fundamental-ngx/docs/core/timeline').then(configureLibRoutes)
    },
    {
        path: 'scrollbar',
        loadChildren: () => import('@fundamental-ngx/docs/core/scrollbar').then(configureLibRoutes)
    },
    {
        path: 'overflow-layout',
        loadChildren: () => import('@fundamental-ngx/docs/core/overflow-layout').then(configureLibRoutes)
    },
    {
        path: 'skeleton',
        loadChildren: () => import('@fundamental-ngx/docs/core/skeleton').then(configureLibRoutes)
    },
    {
        path: 'multi-combobox',
        loadChildren: () => import('@fundamental-ngx/docs/core/multi-combobox').then(configureLibRoutes)
    },
    {
        path: 'avatar-group',
        loadChildren: () => import('@fundamental-ngx/docs/core/avatar-group').then(configureLibRoutes)
    },
    {
        path: 'settings-dialog',
        loadChildren: () => import('@fundamental-ngx/docs/core/settings-dialog').then(configureLibRoutes)
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
                },
                {
                    header: 'Layouts',
                    content: layouts
                },
                {
                    header: 'Utilities',
                    content: utilities
                },
                {
                    header: 'Adapters',
                    content: adapters
                }
            ]
        },
        providers: [
            StackblitzService,
            {
                provide: CURRENT_LIB,
                useValue: 'core'
            },
            {
                provide: MOBILE_MODE_CONFIG,
                useValue: MENU_MOBILE_CONFIG,
                multi: true
            },
            {
                provide: MOBILE_MODE_CONFIG,
                useValue: SELECT_MOBILE_CONFIG,
                multi: true
            },
            {
                provide: MOBILE_MODE_CONFIG,
                useValue: COMBOBOX_MOBILE_CONFIG,
                multi: true
            },
            {
                provide: MOBILE_MODE_CONFIG,
                useValue: MULTI_INPUT_MOBILE_CONFIG,
                multi: true
            },
            {
                provide: MOBILE_MODE_CONFIG,
                useValue: POPOVER_MOBILE_CONFIG,
                multi: true
            },
            {
                provide: MOBILE_MODE_CONFIG,
                useValue: SEARCH_FIELD_MOBILE_CONFIG,
                multi: true
            },
            {
                provide: MOBILE_MODE_CONFIG,
                useValue: DATE_PICKER_MOBILE_CONFIG,
                multi: true
            },
            importProvidersFrom(CoreSchemaModule)
        ],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
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

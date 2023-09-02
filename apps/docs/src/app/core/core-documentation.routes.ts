import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import { CoreSchemaModule } from '@fundamental-ngx/docs/core/schema';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
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
import { HomeDocsComponent } from './component-docs/core-home/core-home.component';
import { CoreDocumentationComponent } from './documentation/core-documentation.component';

const configureCoreRoutes = configureRoutes(API_FILES);

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        providers: [
            StackblitzService,
            { provide: CURRENT_LIB, useValue: 'core' },
            { provide: MOBILE_MODE_CONFIG, useValue: MENU_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: SELECT_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: COMBOBOX_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: POPOVER_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: SEARCH_FIELD_MOBILE_CONFIG, multi: true },
            { provide: MOBILE_MODE_CONFIG, useValue: DATE_PICKER_MOBILE_CONFIG, multi: true },
            importProvidersFrom(CoreSchemaModule)
        ],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            {
                path: 'new-component',
                loadComponent: () =>
                    import('../pages/new-component-page.component').then((m) => m.NewComponentPageComponent)
            },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/i18n').then((m) => m.PlatformI18nDocsModule)
            },
            {
                path: 'action-bar',
                loadChildren: () => import('@fundamental-ngx/docs/core/action-bar').then(configureCoreRoutes)
            },
            {
                path: 'action-sheet',
                loadChildren: () => import('@fundamental-ngx/docs/core/action-sheet').then(configureCoreRoutes)
            },
            {
                path: 'avatar',
                loadChildren: () => import('@fundamental-ngx/docs/core/avatar').then(configureCoreRoutes)
            },
            {
                path: 'avatar-group',
                loadChildren: () => import('@fundamental-ngx/docs/core/avatar-group').then(configureCoreRoutes)
            },
            {
                path: 'bar',
                loadChildren: () => import('@fundamental-ngx/docs/core/bar').then(configureCoreRoutes)
            },
            {
                path: 'breadcrumb',
                loadChildren: () => import('@fundamental-ngx/docs/core/breadcrumb').then(configureCoreRoutes)
            },
            {
                path: 'busy-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/busy-indicator').then(configureCoreRoutes)
            },
            {
                path: 'button',
                loadChildren: () => import('@fundamental-ngx/docs/core/button').then(configureCoreRoutes)
            },
            {
                path: 'card',
                loadChildren: () => import('@fundamental-ngx/docs/core/card').then(configureCoreRoutes)
            },
            {
                path: 'segmented-button',
                loadChildren: () => import('@fundamental-ngx/docs/core/segmented-button').then(configureCoreRoutes)
            },
            {
                path: 'calendar',
                loadChildren: () => import('@fundamental-ngx/docs/core/calendar').then(configureCoreRoutes)
            },
            {
                path: 'carousel',
                loadChildren: () => import('@fundamental-ngx/docs/core/carousel').then(configureCoreRoutes)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('@fundamental-ngx/docs/core/checkbox').then(configureCoreRoutes)
            },
            {
                path: 'combobox',
                loadChildren: () => import('@fundamental-ngx/docs/core/combobox').then(configureCoreRoutes)
            },
            {
                path: 'date-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/date-picker').then(configureCoreRoutes)
            },
            {
                path: 'datetime-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/datetime-picker').then(configureCoreRoutes)
            },
            {
                path: 'dialog',
                loadChildren: () => import('@fundamental-ngx/docs/core/dialog').then(configureCoreRoutes)
            },
            {
                path: 'dynamic-page',
                loadChildren: () => import('@fundamental-ngx/docs/core/dynamic-page').then(configureCoreRoutes)
            },
            {
                path: 'object-page',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-page').then(configureCoreRoutes)
            },
            {
                path: 'facets',
                loadChildren: () => import('@fundamental-ngx/docs/core/facets').then(configureCoreRoutes)
            },
            {
                path: 'feed-list-item',
                loadChildren: () => import('@fundamental-ngx/docs/core/feed-list-item').then(configureCoreRoutes)
            },
            {
                path: 'dynamic-side-content',
                loadChildren: () => import('@fundamental-ngx/docs/core/dynamic-side-content').then(configureCoreRoutes)
            },
            {
                path: 'feed-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/feed-input').then(configureCoreRoutes)
            },
            {
                path: 'file-uploader',
                loadChildren: () => import('@fundamental-ngx/docs/core/file-uploader').then(configureCoreRoutes)
            },
            {
                path: 'fixed-card-layout',
                loadChildren: () => import('@fundamental-ngx/docs/core/fixed-card-layout').then(configureCoreRoutes)
            },
            {
                path: 'flexible-column-layout',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/flexible-column-layout').then(configureCoreRoutes)
            },
            {
                path: 'form-message',
                loadChildren: () => import('@fundamental-ngx/docs/core/form-message').then(configureCoreRoutes)
            },
            {
                path: 'formatted-text',
                loadChildren: () => import('@fundamental-ngx/docs/core/formatted-text').then(configureCoreRoutes)
            },
            {
                path: 'global-config',
                loadChildren: () => import('@fundamental-ngx/docs/core/global-config').then(configureCoreRoutes)
            },
            {
                path: 'content-density',
                loadChildren: () => import('@fundamental-ngx/docs/core/content-density').then(configureCoreRoutes)
            },
            {
                path: 'truncate',
                loadChildren: () => import('@fundamental-ngx/docs/core/truncate').then(configureCoreRoutes)
            },
            {
                path: 'grid-list',
                loadChildren: () => import('@fundamental-ngx/docs/core/grid-list').then(configureCoreRoutes)
            },
            {
                path: 'icon',
                loadChildren: () => import('@fundamental-ngx/docs/core/icon').then(configureCoreRoutes)
            },
            {
                path: 'illustrated-message',
                loadChildren: () => import('@fundamental-ngx/docs/core/illustrated-message').then(configureCoreRoutes)
            },
            {
                path: 'info-label',
                loadChildren: () => import('@fundamental-ngx/docs/core/info-label').then(configureCoreRoutes)
            },
            {
                path: 'infinite-scroll',
                loadChildren: () => import('@fundamental-ngx/docs/core/infinite-scroll').then(configureCoreRoutes)
            },
            {
                path: 'inline-help',
                loadChildren: () => import('@fundamental-ngx/docs/core/inline-help').then(configureCoreRoutes)
            },
            {
                path: 'input',
                loadChildren: () => import('@fundamental-ngx/docs/core/input').then(configureCoreRoutes)
            },
            {
                path: 'input-group',
                loadChildren: () => import('@fundamental-ngx/docs/core/input-group').then(configureCoreRoutes)
            },
            {
                path: 'layout-grid',
                loadChildren: () => import('@fundamental-ngx/docs/core/layout-grid').then(configureCoreRoutes)
            },
            {
                path: 'layout-panel',
                loadChildren: () => import('@fundamental-ngx/docs/core/layout-panel').then(configureCoreRoutes)
            },
            {
                path: 'link',
                loadChildren: () => import('@fundamental-ngx/docs/core/link').then(configureCoreRoutes)
            },
            {
                path: 'list',
                loadChildren: () => import('@fundamental-ngx/docs/core/list').then(configureCoreRoutes)
            },
            {
                path: 'list-byline',
                loadChildren: () => import('@fundamental-ngx/docs/core/list-byline').then(configureCoreRoutes)
            },
            {
                path: 'menu',
                loadChildren: () => import('@fundamental-ngx/docs/core/menu').then(configureCoreRoutes)
            },
            {
                path: 'message-strip',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-strip').then(configureCoreRoutes)
            },
            {
                path: 'message-box',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-box').then(configureCoreRoutes)
            },
            {
                path: 'message-page',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-page').then(configureCoreRoutes)
            },
            {
                path: 'message-toast',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-toast').then(configureCoreRoutes)
            },
            {
                path: 'micro-process-flow',
                loadChildren: () => import('@fundamental-ngx/docs/core/micro-process-flow').then(configureCoreRoutes)
            },
            {
                path: 'multi-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/multi-input').then(configureCoreRoutes)
            },
            {
                path: 'notification',
                loadChildren: () => import('@fundamental-ngx/docs/core/notification').then(configureCoreRoutes)
            },
            {
                path: 'object-identifier',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-identifier').then(configureCoreRoutes)
            },
            {
                path: 'object-marker',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-marker').then(configureCoreRoutes)
            },
            {
                path: 'object-number',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-number').then(configureCoreRoutes)
            },
            {
                path: 'object-status',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-status').then(configureCoreRoutes)
            },
            {
                path: 'pagination',
                loadChildren: () => import('@fundamental-ngx/docs/core/pagination').then(configureCoreRoutes)
            },
            {
                path: 'panel',
                loadChildren: () => import('@fundamental-ngx/docs/core/panel').then(configureCoreRoutes)
            },
            {
                path: 'popover',
                loadChildren: () => import('@fundamental-ngx/docs/core/popover').then(configureCoreRoutes)
            },
            {
                path: 'product-switch',
                loadChildren: () => import('@fundamental-ngx/docs/core/product-switch').then(configureCoreRoutes)
            },
            {
                path: 'progress-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/progress-indicator').then(configureCoreRoutes)
            },
            {
                path: 'quick-view',
                loadChildren: () => import('@fundamental-ngx/docs/core/quick-view').then(configureCoreRoutes)
            },
            {
                path: 'radio',
                loadChildren: () => import('@fundamental-ngx/docs/core/radio').then(configureCoreRoutes)
            },
            {
                path: 'rating-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/rating-indicator').then(configureCoreRoutes)
            },
            {
                path: 'resizable-card-layout',
                loadChildren: () => import('@fundamental-ngx/docs/core/resizable-card-layout').then(configureCoreRoutes)
            },
            {
                path: 'scroll-spy',
                loadChildren: () => import('@fundamental-ngx/docs/core/scroll-spy').then(configureCoreRoutes)
            },
            {
                path: 'shellbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/shellbar').then(configureCoreRoutes)
            },
            {
                path: 'side-navigation',
                loadChildren: () => import('@fundamental-ngx/docs/core/side-navigation').then(configureCoreRoutes)
            },
            {
                path: 'select',
                loadChildren: () => import('@fundamental-ngx/docs/core/select').then(configureCoreRoutes)
            },
            {
                path: 'slider',
                loadChildren: () => import('@fundamental-ngx/docs/core/slider').then(configureCoreRoutes)
            },
            {
                path: 'split-button',
                loadChildren: () => import('@fundamental-ngx/docs/core/split-button').then(configureCoreRoutes)
            },
            {
                path: 'splitter',
                loadChildren: () => import('@fundamental-ngx/docs/core/splitter').then(configureCoreRoutes)
            },
            {
                path: 'status-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/status-indicator').then(configureCoreRoutes)
            },
            {
                path: 'step-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/step-input').then(configureCoreRoutes)
            },
            {
                path: 'switch',
                loadChildren: () => import('@fundamental-ngx/docs/core/switch').then(configureCoreRoutes)
            },
            {
                path: 'table',
                loadChildren: () => import('@fundamental-ngx/docs/core/table').then(configureCoreRoutes)
            },
            {
                path: 'tabs',
                loadChildren: () => import('@fundamental-ngx/docs/core/tabs').then(configureCoreRoutes)
            },
            {
                path: 'text',
                loadChildren: () => import('@fundamental-ngx/docs/core/text').then(configureCoreRoutes)
            },
            {
                path: 'textarea',
                loadChildren: () => import('@fundamental-ngx/docs/core/textarea').then(configureCoreRoutes)
            },
            {
                path: 'theming',
                loadChildren: () => import('@fundamental-ngx/docs/core/theming').then(configureCoreRoutes)
            },
            {
                path: 'tile',
                loadChildren: () => import('@fundamental-ngx/docs/core/tile').then(configureCoreRoutes)
            },
            {
                path: 'time',
                loadChildren: () => import('@fundamental-ngx/docs/core/time').then(configureCoreRoutes)
            },
            {
                path: 'time-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/time-picker').then(configureCoreRoutes)
            },
            {
                path: 'title',
                loadChildren: () => import('@fundamental-ngx/docs/core/title').then(configureCoreRoutes)
            },
            {
                path: 'token',
                loadChildren: () => import('@fundamental-ngx/docs/core/token').then(configureCoreRoutes)
            },
            {
                path: 'toolbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/toolbar').then(configureCoreRoutes)
            },
            {
                path: 'tree',
                loadChildren: () => import('@fundamental-ngx/docs/core/tree').then(configureCoreRoutes)
            },
            {
                path: 'vertical-navigation',
                loadChildren: () => import('@fundamental-ngx/docs/core/vertical-navigation').then(configureCoreRoutes)
            },
            {
                path: 'upload-collection',
                loadChildren: () => import('@fundamental-ngx/docs/core/upload-collection').then(configureCoreRoutes)
            },
            {
                path: 'wizard',
                loadChildren: () => import('@fundamental-ngx/docs/core/wizard').then(configureCoreRoutes)
            },
            {
                path: 'moment-datetime-adapter',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/moment-datetime-adapter').then(configureCoreRoutes)
            },
            {
                path: 'dayjs-datetime-adapter',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/core/dayjs-datetime-adapter').then(configureCoreRoutes)
            },
            {
                path: 'timeline',
                loadChildren: () => import('@fundamental-ngx/docs/core/timeline').then(configureCoreRoutes)
            },
            {
                path: 'scrollbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/scrollbar').then(configureCoreRoutes)
            },
            {
                path: 'overflow-layout',
                loadChildren: () => import('@fundamental-ngx/docs/core/overflow-layout').then(configureCoreRoutes)
            },
            {
                path: 'skeleton',
                loadChildren: () => import('@fundamental-ngx/docs/core/skeleton').then(configureCoreRoutes)
            },
            {
                path: 'multi-combobox',
                loadChildren: () => import('@fundamental-ngx/docs/core/multi-combobox').then(configureCoreRoutes)
            }
        ]
    }
];

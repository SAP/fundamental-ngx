import { Routes } from '@angular/router';
import { HomeDocsComponent } from './component-docs/core-home/core-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { CoreDocumentationComponent } from './documentation/core-documentation.component';

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/i18n').then((m) => m.PlatformI18nDocsModule)
            },
            {
                path: 'action-bar',
                loadChildren: () => import('@fundamental-ngx/docs/core/action-bar').then((m) => m.ROUTES)
            },
            {
                path: 'action-sheet',
                loadChildren: () => import('@fundamental-ngx/docs/core/action-sheet').then((m) => m.ROUTES)
            },
            {
                path: 'avatar',
                loadChildren: () => import('@fundamental-ngx/docs/core/avatar').then((m) => m.ROUTES)
            },
            {
                path: 'avatar-group',
                loadChildren: () => import('@fundamental-ngx/docs/core/avatar-group').then((m) => m.ROUTES)
            },
            {
                path: 'bar',
                loadChildren: () => import('@fundamental-ngx/docs/core/bar').then((m) => m.ROUTES)
            },
            {
                path: 'breadcrumb',
                loadChildren: () => import('@fundamental-ngx/docs/core/breadcrumb').then((m) => m.ROUTES)
            },
            {
                path: 'busy-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/busy-indicator').then((m) => m.ROUTES)
            },
            {
                path: 'button',
                loadChildren: () => import('@fundamental-ngx/docs/core/button').then((m) => m.ROUTES)
            },
            {
                path: 'card',
                loadChildren: () => import('@fundamental-ngx/docs/core/card').then((m) => m.ROUTES)
            },
            {
                path: 'segmented-button',
                loadChildren: () => import('@fundamental-ngx/docs/core/segmented-button').then((m) => m.ROUTES)
            },
            {
                path: 'calendar',
                loadChildren: () => import('@fundamental-ngx/docs/core/calendar').then((m) => m.ROUTES)
            },
            {
                path: 'carousel',
                loadChildren: () => import('@fundamental-ngx/docs/core/carousel').then((m) => m.ROUTES)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('@fundamental-ngx/docs/core/checkbox').then((m) => m.ROUTES)
            },
            {
                path: 'combobox',
                loadChildren: () => import('@fundamental-ngx/docs/core/combobox').then((m) => m.ROUTES)
            },
            {
                path: 'date-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/date-picker').then((m) => m.ROUTES)
            },
            {
                path: 'datetime-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/datetime-picker').then((m) => m.ROUTES)
            },
            {
                path: 'dialog',
                loadChildren: () => import('@fundamental-ngx/docs/core/dialog').then((m) => m.ROUTES)
            },
            {
                path: 'dynamic-page',
                loadChildren: () => import('@fundamental-ngx/docs/core/dynamic-page').then((m) => m.ROUTES)
            },
            {
                path: 'object-page',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-page').then((m) => m.ROUTES)
            },
            {
                path: 'facets',
                loadChildren: () => import('@fundamental-ngx/docs/core/facets').then((m) => m.ROUTES)
            },
            {
                path: 'feed-list-item',
                loadChildren: () => import('@fundamental-ngx/docs/core/feed-list-item').then((m) => m.ROUTES)
            },
            {
                path: 'dynamic-side-content',
                loadChildren: () => import('@fundamental-ngx/docs/core/dynamic-side-content').then((m) => m.ROUTES)
            },
            {
                path: 'feed-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/feed-input').then((m) => m.ROUTES)
            },
            {
                path: 'file-uploader',
                loadChildren: () => import('@fundamental-ngx/docs/core/file-uploader').then((m) => m.ROUTES)
            },
            {
                path: 'fixed-card-layout',
                loadChildren: () => import('@fundamental-ngx/docs/core/fixed-card-layout').then((m) => m.ROUTES)
            },
            {
                path: 'flexible-column-layout',
                loadChildren: () => import('@fundamental-ngx/docs/core/flexible-column-layout').then((m) => m.ROUTES)
            },
            {
                path: 'form-message',
                loadChildren: () => import('@fundamental-ngx/docs/core/form-message').then((m) => m.ROUTES)
            },
            {
                path: 'formatted-text',
                loadChildren: () => import('@fundamental-ngx/docs/core/formatted-text').then((m) => m.ROUTES)
            },
            {
                path: 'global-config',
                loadChildren: () => import('@fundamental-ngx/docs/core/global-config').then((m) => m.ROUTES)
            },
            {
                path: 'content-density',
                loadChildren: () => import('@fundamental-ngx/docs/core/content-density').then((m) => m.ROUTES)
            },
            {
                path: 'truncate',
                loadChildren: () => import('@fundamental-ngx/docs/core/truncate').then((m) => m.ROUTES)
            },
            {
                path: 'grid-list',
                loadChildren: () => import('@fundamental-ngx/docs/core/grid-list').then((m) => m.ROUTES)
            },
            {
                path: 'icon',
                loadChildren: () => import('@fundamental-ngx/docs/core/icon').then((m) => m.ROUTES)
            },
            {
                path: 'illustrated-message',
                loadChildren: () => import('@fundamental-ngx/docs/core/illustrated-message').then((m) => m.ROUTES)
            },
            {
                path: 'info-label',
                loadChildren: () => import('@fundamental-ngx/docs/core/info-label').then((m) => m.ROUTES)
            },
            {
                path: 'infinite-scroll',
                loadChildren: () => import('@fundamental-ngx/docs/core/infinite-scroll').then((m) => m.ROUTES)
            },
            {
                path: 'inline-help',
                loadChildren: () => import('@fundamental-ngx/docs/core/inline-help').then((m) => m.ROUTES)
            },
            {
                path: 'input',
                loadChildren: () => import('@fundamental-ngx/docs/core/input').then((m) => m.ROUTES)
            },
            {
                path: 'input-group',
                loadChildren: () => import('@fundamental-ngx/docs/core/input-group').then((m) => m.ROUTES)
            },
            {
                path: 'layout-grid',
                loadChildren: () => import('@fundamental-ngx/docs/core/layout-grid').then((m) => m.ROUTES)
            },
            {
                path: 'layout-panel',
                loadChildren: () => import('@fundamental-ngx/docs/core/layout-panel').then((m) => m.ROUTES)
            },
            {
                path: 'link',
                loadChildren: () => import('@fundamental-ngx/docs/core/link').then((m) => m.ROUTES)
            },
            {
                path: 'list',
                loadChildren: () => import('@fundamental-ngx/docs/core/list').then((m) => m.ROUTES)
            },
            {
                path: 'list-byline',
                loadChildren: () => import('@fundamental-ngx/docs/core/list-byline').then((m) => m.ROUTES)
            },
            {
                path: 'menu',
                loadChildren: () => import('@fundamental-ngx/docs/core/menu').then((m) => m.ROUTES)
            },
            {
                path: 'message-strip',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-strip').then((m) => m.ROUTES)
            },
            {
                path: 'message-box',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-box').then((m) => m.ROUTES)
            },
            {
                path: 'message-page',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-page').then((m) => m.ROUTES)
            },
            {
                path: 'message-toast',
                loadChildren: () => import('@fundamental-ngx/docs/core/message-toast').then((m) => m.ROUTES)
            },
            {
                path: 'micro-process-flow',
                loadChildren: () => import('@fundamental-ngx/docs/core/micro-process-flow').then((m) => m.ROUTES)
            },
            {
                path: 'multi-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/multi-input').then((m) => m.ROUTES)
            },
            {
                path: 'notification',
                loadChildren: () => import('@fundamental-ngx/docs/core/notification').then((m) => m.ROUTES)
            },
            {
                path: 'object-identifier',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-identifier').then((m) => m.ROUTES)
            },
            {
                path: 'object-marker',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-marker').then((m) => m.ROUTES)
            },
            {
                path: 'object-number',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-number').then((m) => m.ROUTES)
            },
            {
                path: 'object-status',
                loadChildren: () => import('@fundamental-ngx/docs/core/object-status').then((m) => m.ROUTES)
            },
            {
                path: 'pagination',
                loadChildren: () => import('@fundamental-ngx/docs/core/pagination').then((m) => m.ROUTES)
            },
            {
                path: 'panel',
                loadChildren: () => import('@fundamental-ngx/docs/core/panel').then((m) => m.ROUTES)
            },
            {
                path: 'popover',
                loadChildren: () => import('@fundamental-ngx/docs/core/popover').then((m) => m.ROUTES)
            },
            {
                path: 'product-switch',
                loadChildren: () => import('@fundamental-ngx/docs/core/product-switch').then((m) => m.ROUTES)
            },
            {
                path: 'progress-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/progress-indicator').then((m) => m.ROUTES)
            },
            {
                path: 'quick-view',
                loadChildren: () => import('@fundamental-ngx/docs/core/quick-view').then((m) => m.ROUTES)
            },
            {
                path: 'radio',
                loadChildren: () => import('@fundamental-ngx/docs/core/radio').then((m) => m.ROUTES)
            },
            {
                path: 'rating-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/rating-indicator').then((m) => m.ROUTES)
            },
            {
                path: 'resizable-card-layout',
                loadChildren: () => import('@fundamental-ngx/docs/core/resizable-card-layout').then((m) => m.ROUTES)
            },
            {
                path: 'scroll-spy',
                loadChildren: () => import('@fundamental-ngx/docs/core/scroll-spy').then((m) => m.ROUTES)
            },
            {
                path: 'shellbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/shellbar').then((m) => m.ROUTES)
            },
            {
                path: 'side-navigation',
                loadChildren: () => import('@fundamental-ngx/docs/core/side-navigation').then((m) => m.ROUTES)
            },
            {
                path: 'select',
                loadChildren: () => import('@fundamental-ngx/docs/core/select').then((m) => m.ROUTES)
            },
            {
                path: 'slider',
                loadChildren: () => import('@fundamental-ngx/docs/core/slider').then((m) => m.ROUTES)
            },
            {
                path: 'split-button',
                loadChildren: () => import('@fundamental-ngx/docs/core/split-button').then((m) => m.ROUTES)
            },
            {
                path: 'splitter',
                loadChildren: () => import('@fundamental-ngx/docs/core/splitter').then((m) => m.ROUTES)
            },
            {
                path: 'status-indicator',
                loadChildren: () => import('@fundamental-ngx/docs/core/status-indicator').then((m) => m.ROUTES)
            },
            {
                path: 'step-input',
                loadChildren: () => import('@fundamental-ngx/docs/core/step-input').then((m) => m.ROUTES)
            },
            {
                path: 'switch',
                loadChildren: () => import('@fundamental-ngx/docs/core/switch').then((m) => m.ROUTES)
            },
            {
                path: 'table',
                loadChildren: () => import('@fundamental-ngx/docs/core/table').then((m) => m.ROUTES)
            },
            {
                path: 'tabs',
                loadChildren: () => import('@fundamental-ngx/docs/core/tabs').then((m) => m.ROUTES)
            },
            {
                path: 'text',
                loadChildren: () => import('@fundamental-ngx/docs/core/text').then((m) => m.ROUTES)
            },
            {
                path: 'textarea',
                loadChildren: () => import('@fundamental-ngx/docs/core/textarea').then((m) => m.ROUTES)
            },
            {
                path: 'theming',
                loadChildren: () => import('@fundamental-ngx/docs/core/theming').then((m) => m.ROUTES)
            },
            {
                path: 'tile',
                loadChildren: () => import('@fundamental-ngx/docs/core/tile').then((m) => m.ROUTES)
            },
            {
                path: 'time',
                loadChildren: () => import('@fundamental-ngx/docs/core/time').then((m) => m.ROUTES)
            },
            {
                path: 'time-picker',
                loadChildren: () => import('@fundamental-ngx/docs/core/time-picker').then((m) => m.ROUTES)
            },
            {
                path: 'title',
                loadChildren: () => import('@fundamental-ngx/docs/core/title').then((m) => m.ROUTES)
            },
            {
                path: 'token',
                loadChildren: () => import('@fundamental-ngx/docs/core/token').then((m) => m.ROUTES)
            },
            {
                path: 'toolbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/toolbar').then((m) => m.ROUTES)
            },
            {
                path: 'tree',
                loadChildren: () => import('@fundamental-ngx/docs/core/tree').then((m) => m.ROUTES)
            },
            {
                path: 'vertical-navigation',
                loadChildren: () => import('@fundamental-ngx/docs/core/vertical-navigation').then((m) => m.ROUTES)
            },
            {
                path: 'upload-collection',
                loadChildren: () => import('@fundamental-ngx/docs/core/upload-collection').then((m) => m.ROUTES)
            },
            {
                path: 'wizard',
                loadChildren: () => import('@fundamental-ngx/docs/core/wizard').then((m) => m.ROUTES)
            },
            {
                path: 'moment-datetime-adapter',
                loadChildren: () => import('@fundamental-ngx/docs/core/moment-datetime-adapter').then((m) => m.ROUTES)
            },
            {
                path: 'dayjs-datetime-adapter',
                loadChildren: () => import('@fundamental-ngx/docs/core/dayjs-datetime-adapter').then((m) => m.ROUTES)
            },
            {
                path: 'timeline',
                loadChildren: () => import('@fundamental-ngx/docs/core/timeline').then((m) => m.ROUTES)
            },
            {
                path: 'scrollbar',
                loadChildren: () => import('@fundamental-ngx/docs/core/scrollbar').then((m) => m.ROUTES)
            },
            {
                path: 'overflow-layout',
                loadChildren: () => import('@fundamental-ngx/docs/core/overflow-layout').then((m) => m.ROUTES)
            },
            {
                path: 'skeleton',
                loadChildren: () => import('@fundamental-ngx/docs/core/skeleton').then((m) => m.ROUTES)
            },
            {
                path: 'multi-combobox',
                loadChildren: () => import('@fundamental-ngx/docs/core/multi-combobox').then((m) => m.ROUTES)
            }
        ]
    }
];

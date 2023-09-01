import { Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { configureRoutes } from '@fundamental-ngx/docs/shared';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';

const configurePlatformRoutes = configureRoutes(API_FILES);

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: PlatformHomeComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/i18n').then((m) => m.PlatformI18nDocsModule)
            },
            {
                path: 'button',
                loadChildren: () => import('@fundamental-ngx/docs/platform/button').then(configurePlatformRoutes)
            },
            {
                path: 'action-bar',
                loadChildren: () => import('@fundamental-ngx/docs/platform/action-bar').then(configurePlatformRoutes)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('@fundamental-ngx/docs/platform/checkbox').then(configurePlatformRoutes)
            },
            {
                path: 'checkbox-group',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/checkbox-group').then(configurePlatformRoutes)
            },
            {
                path: 'date-picker',
                loadChildren: () => import('@fundamental-ngx/docs/platform/date-picker').then(configurePlatformRoutes)
            },
            {
                path: 'datetime-picker',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/datetime-picker').then(configurePlatformRoutes)
            },
            {
                path: 'dynamic-page',
                loadChildren: () => import('@fundamental-ngx/docs/platform/dynamic-page').then(configurePlatformRoutes)
            },
            {
                path: 'page-footer',
                loadChildren: () => import('@fundamental-ngx/docs/platform/page-footer').then(configurePlatformRoutes)
            },
            {
                path: 'form-generator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/form-generator').then(configurePlatformRoutes)
            },
            {
                path: 'form-container',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/form-container').then(configurePlatformRoutes)
            },
            {
                path: 'link',
                loadChildren: () => import('@fundamental-ngx/docs/platform/link').then(configurePlatformRoutes)
            },
            {
                path: 'menu',
                loadChildren: () => import('@fundamental-ngx/docs/platform/menu').then(configurePlatformRoutes)
            },
            {
                path: 'menu-button',
                loadChildren: () => import('@fundamental-ngx/docs/platform/menu-button').then(configurePlatformRoutes)
            },
            {
                path: 'search-field',
                loadChildren: () => import('@fundamental-ngx/docs/platform/search-field').then(configurePlatformRoutes)
            },
            {
                path: 'select',
                loadChildren: () => import('@fundamental-ngx/docs/platform/select').then(configurePlatformRoutes)
            },
            {
                path: 'radio-group',
                loadChildren: () => import('@fundamental-ngx/docs/platform/radio-group').then(configurePlatformRoutes)
            },
            {
                path: 'split-menu-button',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/split-menu-button').then(configurePlatformRoutes)
            },
            {
                path: 'info-label',
                loadChildren: () => import('@fundamental-ngx/docs/platform/info-label').then(configurePlatformRoutes)
            },
            {
                path: 'table',
                loadChildren: () => import('@fundamental-ngx/docs/platform/table').then(configurePlatformRoutes)
            },
            {
                path: 'textarea',
                loadChildren: () => import('@fundamental-ngx/docs/platform/textarea').then(configurePlatformRoutes)
            },
            {
                path: 'panel',
                loadChildren: () => import('@fundamental-ngx/docs/platform/panel').then(configurePlatformRoutes)
            },
            {
                path: 'switch',
                loadChildren: () => import('@fundamental-ngx/docs/platform/switch').then(configurePlatformRoutes)
            },
            {
                path: 'input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/input').then(configurePlatformRoutes)
            },
            {
                path: 'step-input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/step-input').then(configurePlatformRoutes)
            },
            {
                path: 'object-status',
                loadChildren: () => import('@fundamental-ngx/docs/platform/object-status').then(configurePlatformRoutes)
            },
            {
                path: 'object-marker',
                loadChildren: () => import('@fundamental-ngx/docs/platform/object-marker').then(configurePlatformRoutes)
            },
            {
                path: 'object-attribute',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/object-attribute').then(configurePlatformRoutes)
            },
            {
                path: 'input-group',
                loadChildren: () => import('@fundamental-ngx/docs/platform/input-group').then(configurePlatformRoutes)
            },
            {
                path: 'combobox',
                loadChildren: () => import('@fundamental-ngx/docs/platform/combobox').then(configurePlatformRoutes)
            },
            {
                path: 'list',
                loadChildren: () => import('@fundamental-ngx/docs/platform/list').then(configurePlatformRoutes)
            },
            {
                path: 'standard-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/standard-list-item').then(configurePlatformRoutes)
            },
            {
                path: 'thumbnail',
                loadChildren: () => import('@fundamental-ngx/docs/platform/thumbnail').then(configurePlatformRoutes)
            },
            {
                path: 'time-picker',
                loadChildren: () => import('@fundamental-ngx/docs/platform/time-picker').then(configurePlatformRoutes)
            },
            {
                path: 'action-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/action-list-item').then(configurePlatformRoutes)
            },
            {
                path: 'display-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/display-list-item').then(configurePlatformRoutes)
            },
            {
                path: 'object-list-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/object-list-item').then(configurePlatformRoutes)
            },
            {
                path: 'value-help-dialog',
                loadChildren: () => import('@fundamental-ngx/docs/platform/vhd').then(configurePlatformRoutes)
            },
            {
                path: 'multi-combobox',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/multi-combobox').then(configurePlatformRoutes)
            },
            {
                path: 'multi-input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/multi-input').then(configurePlatformRoutes)
            },
            {
                path: 'feed-input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/feed-input').then(configurePlatformRoutes)
            },
            {
                path: 'file-uploader',
                loadChildren: () => import('@fundamental-ngx/docs/platform/file-uploader').then(configurePlatformRoutes)
            },
            {
                path: 'upload-collection',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/upload-collection').then(configurePlatformRoutes)
            },
            {
                path: 'approval-flow',
                loadChildren: () => import('@fundamental-ngx/docs/platform/approval-flow').then(configurePlatformRoutes)
            },
            {
                path: 'slider',
                loadChildren: () => import('@fundamental-ngx/docs/platform/slider').then(configurePlatformRoutes)
            },
            {
                path: 'wizard-generator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/wizard-generator').then(configurePlatformRoutes)
            },
            {
                path: 'icon-tab-bar',
                loadChildren: () => import('@fundamental-ngx/docs/platform/icon-tab-bar').then(configurePlatformRoutes)
            },
            {
                path: 'smart-filter-bar',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/smart-filter-bar').then(configurePlatformRoutes)
            },
            {
                path: 'message-popover',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/message-popover').then(configurePlatformRoutes)
            },
            {
                path: 'variant-management',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/variant-management').then(configurePlatformRoutes)
            },
            {
                path: 'settings-generator',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/platform/settings-generator').then(configurePlatformRoutes)
            }
        ]
    }
];

import { Routes } from '@angular/router';

import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';

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
                loadChildren: () => import('@fundamental-ngx/docs/platform/button').then((m) => m.ROUTES)
            },
            {
                path: 'action-bar',
                loadChildren: () => import('@fundamental-ngx/docs/platform/action-bar').then((m) => m.ROUTES)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('@fundamental-ngx/docs/platform/checkbox').then((m) => m.ROUTES)
            },
            {
                path: 'checkbox-group',
                loadChildren: () => import('@fundamental-ngx/docs/platform/checkbox-group').then((m) => m.ROUTES)
            },
            {
                path: 'date-picker',
                loadChildren: () => import('@fundamental-ngx/docs/platform/date-picker').then((m) => m.ROUTES)
            },
            {
                path: 'datetime-picker',
                loadChildren: () => import('@fundamental-ngx/docs/platform/datetime-picker').then((m) => m.ROUTES)
            },
            {
                path: 'dynamic-page',
                loadChildren: () => import('@fundamental-ngx/docs/platform/dynamic-page').then((m) => m.ROUTES)
            },
            {
                path: 'page-footer',
                loadChildren: () => import('@fundamental-ngx/docs/platform/page-footer').then((m) => m.ROUTES)
            },
            {
                path: 'form-generator',
                loadChildren: () => import('@fundamental-ngx/docs/platform/form-generator').then((m) => m.ROUTES)
            },
            {
                path: 'form-container',
                loadChildren: () => import('@fundamental-ngx/docs/platform/form-container').then((m) => m.ROUTES)
            },
            {
                path: 'link',
                loadChildren: () => import('@fundamental-ngx/docs/platform/link').then((m) => m.ROUTES)
            },
            {
                path: 'menu',
                loadChildren: () => import('@fundamental-ngx/docs/platform/menu').then((m) => m.ROUTES)
            },
            {
                path: 'menu-button',
                loadChildren: () => import('@fundamental-ngx/docs/platform/menu-button').then((m) => m.ROUTES)
            },
            {
                path: 'search-field',
                loadChildren: () => import('@fundamental-ngx/docs/platform/search-field').then((m) => m.ROUTES)
            },
            {
                path: 'select',
                loadChildren: () => import('@fundamental-ngx/docs/platform/select').then((m) => m.ROUTES)
            },
            {
                path: 'radio-group',
                loadChildren: () => import('@fundamental-ngx/docs/platform/radio-group').then((m) => m.ROUTES)
            },
            {
                path: 'split-menu-button',
                loadChildren: () => import('@fundamental-ngx/docs/platform/split-menu-button').then((m) => m.ROUTES)
            },
            {
                path: 'info-label',
                loadChildren: () => import('@fundamental-ngx/docs/platform/info-label').then((m) => m.ROUTES)
            },
            {
                path: 'table',
                loadChildren: () => import('@fundamental-ngx/docs/platform/table').then((m) => m.ROUTES)
            },
            {
                path: 'textarea',
                loadChildren: () => import('@fundamental-ngx/docs/platform/textarea').then((m) => m.ROUTES)
            },
            {
                path: 'panel',
                loadChildren: () => import('@fundamental-ngx/docs/platform/panel').then((m) => m.ROUTES)
            },
            {
                path: 'switch',
                loadChildren: () => import('@fundamental-ngx/docs/platform/switch').then((m) => m.ROUTES)
            },
            {
                path: 'input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/input').then((m) => m.ROUTES)
            },
            {
                path: 'step-input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/step-input').then((m) => m.ROUTES)
            },
            {
                path: 'object-status',
                loadChildren: () => import('@fundamental-ngx/docs/platform/object-status').then((m) => m.ROUTES)
            },
            {
                path: 'object-marker',
                loadChildren: () => import('@fundamental-ngx/docs/platform/object-marker').then((m) => m.ROUTES)
            },
            {
                path: 'object-attribute',
                loadChildren: () => import('@fundamental-ngx/docs/platform/object-attribute').then((m) => m.ROUTES)
            },
            {
                path: 'input-group',
                loadChildren: () => import('@fundamental-ngx/docs/platform/input-group').then((m) => m.ROUTES)
            },
            {
                path: 'combobox',
                loadChildren: () => import('@fundamental-ngx/docs/platform/combobox').then((m) => m.ROUTES)
            },
            {
                path: 'list',
                loadChildren: () => import('@fundamental-ngx/docs/platform/list').then((m) => m.ROUTES)
            },
            {
                path: 'standard-list-item',
                loadChildren: () => import('@fundamental-ngx/docs/platform/standard-list-item').then((m) => m.ROUTES)
            },
            {
                path: 'thumbnail',
                loadChildren: () => import('@fundamental-ngx/docs/platform/thumbnail').then((m) => m.ROUTES)
            },
            {
                path: 'time-picker',
                loadChildren: () => import('@fundamental-ngx/docs/platform/time-picker').then((m) => m.ROUTES)
            },
            {
                path: 'action-list-item',
                loadChildren: () => import('@fundamental-ngx/docs/platform/action-list-item').then((m) => m.ROUTES)
            },
            {
                path: 'display-list-item',
                loadChildren: () => import('@fundamental-ngx/docs/platform/display-list-item').then((m) => m.ROUTES)
            },
            {
                path: 'object-list-item',
                loadChildren: () => import('@fundamental-ngx/docs/platform/object-list-item').then((m) => m.ROUTES)
            },
            {
                path: 'value-help-dialog',
                loadChildren: () => import('@fundamental-ngx/docs/platform/vhd').then((m) => m.ROUTES)
            },
            {
                path: 'multi-combobox',
                loadChildren: () => import('@fundamental-ngx/docs/platform/multi-combobox').then((m) => m.ROUTES)
            },
            {
                path: 'multi-input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/multi-input').then((m) => m.ROUTES)
            },
            {
                path: 'feed-input',
                loadChildren: () => import('@fundamental-ngx/docs/platform/feed-input').then((m) => m.ROUTES)
            },
            {
                path: 'file-uploader',
                loadChildren: () => import('@fundamental-ngx/docs/platform/file-uploader').then((m) => m.ROUTES)
            },
            {
                path: 'upload-collection',
                loadChildren: () => import('@fundamental-ngx/docs/platform/upload-collection').then((m) => m.ROUTES)
            },
            {
                path: 'approval-flow',
                loadChildren: () => import('@fundamental-ngx/docs/platform/approval-flow').then((m) => m.ROUTES)
            },
            {
                path: 'slider',
                loadChildren: () => import('@fundamental-ngx/docs/platform/slider').then((m) => m.ROUTES)
            },
            {
                path: 'wizard-generator',
                loadChildren: () => import('@fundamental-ngx/docs/platform/wizard-generator').then((m) => m.ROUTES)
            },
            {
                path: 'icon-tab-bar',
                loadChildren: () => import('@fundamental-ngx/docs/platform/icon-tab-bar').then((m) => m.ROUTES)
            },
            {
                path: 'smart-filter-bar',
                loadChildren: () => import('@fundamental-ngx/docs/platform/smart-filter-bar').then((m) => m.ROUTES)
            },
            {
                path: 'message-popover',
                loadChildren: () => import('@fundamental-ngx/docs/platform/message-popover').then((m) => m.ROUTES)
            },
            {
                path: 'variant-management',
                loadChildren: () => import('@fundamental-ngx/docs/platform/variant-management').then((m) => m.ROUTES)
            },
            {
                path: 'settings-generator',
                loadChildren: () => import('@fundamental-ngx/docs/platform/settings-generator').then((m) => m.ROUTES)
            }
        ]
    }
];

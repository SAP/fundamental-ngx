import { Routes } from '@angular/router';

import { importProvidersFrom } from '@angular/core';
import { PlatformSchemaModule } from '@fundamental-ngx/docs/platform/schema';
import { configureRoutes, CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { API_FILES } from './api-files';
import { sections } from './docs-data';

const configurePlatformRoutes = configureRoutes(API_FILES);

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@fundamental-ngx/docs/shared-pages').then((m) => m.LibraryDocShellPageComponent),
        data: {
            sections
        },
        providers: [
            { provide: CURRENT_LIB, useValue: 'platform' },
            StackblitzService,
            importProvidersFrom(PlatformSchemaModule)
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

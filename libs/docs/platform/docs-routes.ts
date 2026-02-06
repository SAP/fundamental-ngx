import { Routes } from '@angular/router';

import { importProvidersFrom } from '@angular/core';
import { PlatformSchemaModule } from '@fundamental-ngx/docs/platform/schema';
import { configureRoutes, CURRENT_LIB, StackblitzService } from '@fundamental-ngx/docs/shared';
import { API_FILES } from './api-files';
import { components, guides, layouts, utilities } from './docs-data.json';

const configureLibRoutes = configureRoutes(API_FILES);

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
const componentRoutes = [
    {
        path: 'button',
        loadChildren: () => import('@fundamental-ngx/docs/platform/button').then(configureLibRoutes)
    },
    {
        path: 'checkbox',
        loadChildren: () => import('@fundamental-ngx/docs/platform/checkbox').then(configureLibRoutes)
    },
    {
        path: 'checkbox-group',
        loadChildren: () => import('@fundamental-ngx/docs/platform/checkbox-group').then(configureLibRoutes)
    },
    {
        path: 'date-picker',
        loadChildren: () => import('@fundamental-ngx/docs/platform/date-picker').then(configureLibRoutes)
    },
    {
        path: 'datetime-picker',
        loadChildren: () => import('@fundamental-ngx/docs/platform/datetime-picker').then(configureLibRoutes)
    },
    {
        path: 'dynamic-page',
        loadChildren: () => import('@fundamental-ngx/docs/platform/dynamic-page').then(configureLibRoutes)
    },
    {
        path: 'page-footer',
        loadChildren: () => import('@fundamental-ngx/docs/platform/page-footer').then(configureLibRoutes)
    },
    {
        path: 'form-generator',
        loadChildren: () => import('@fundamental-ngx/docs/platform/form-generator').then(configureLibRoutes)
    },
    {
        path: 'form-container',
        loadChildren: () => import('@fundamental-ngx/docs/platform/form-container').then(configureLibRoutes)
    },
    {
        path: 'link',
        loadChildren: () => import('@fundamental-ngx/docs/platform/link').then(configureLibRoutes)
    },
    {
        path: 'menu',
        loadChildren: () => import('@fundamental-ngx/docs/platform/menu').then(configureLibRoutes)
    },
    {
        path: 'menu-button',
        loadChildren: () => import('@fundamental-ngx/docs/platform/menu-button').then(configureLibRoutes)
    },
    {
        path: 'search-field',
        loadChildren: () => import('@fundamental-ngx/docs/platform/search-field').then(configureLibRoutes)
    },
    {
        path: 'select',
        loadChildren: () => import('@fundamental-ngx/docs/platform/select').then(configureLibRoutes)
    },
    {
        path: 'radio-group',
        loadChildren: () => import('@fundamental-ngx/docs/platform/radio-group').then(configureLibRoutes)
    },
    {
        path: 'split-menu-button',
        loadChildren: () => import('@fundamental-ngx/docs/platform/split-menu-button').then(configureLibRoutes)
    },
    {
        path: 'table',
        loadChildren: () => import('@fundamental-ngx/docs/platform/table').then(configureLibRoutes)
    },
    {
        path: 'textarea',
        loadChildren: () => import('@fundamental-ngx/docs/platform/textarea').then(configureLibRoutes)
    },
    {
        path: 'panel',
        loadChildren: () => import('@fundamental-ngx/docs/platform/panel').then(configureLibRoutes)
    },
    {
        path: 'switch',
        loadChildren: () => import('@fundamental-ngx/docs/platform/switch').then(configureLibRoutes)
    },
    {
        path: 'input',
        loadChildren: () => import('@fundamental-ngx/docs/platform/input').then(configureLibRoutes)
    },
    {
        path: 'step-input',
        loadChildren: () => import('@fundamental-ngx/docs/platform/step-input').then(configureLibRoutes)
    },
    {
        path: 'object-status',
        loadChildren: () => import('@fundamental-ngx/docs/platform/object-status').then(configureLibRoutes)
    },
    {
        path: 'object-marker',
        loadChildren: () => import('@fundamental-ngx/docs/platform/object-marker').then(configureLibRoutes)
    },
    {
        path: 'input-group',
        loadChildren: () => import('@fundamental-ngx/docs/platform/input-group').then(configureLibRoutes)
    },
    {
        path: 'combobox',
        loadChildren: () => import('@fundamental-ngx/docs/platform/combobox').then(configureLibRoutes)
    },
    {
        path: 'list',
        loadChildren: () => import('@fundamental-ngx/docs/platform/list').then(configureLibRoutes)
    },
    {
        path: 'standard-list-item',
        loadChildren: () => import('@fundamental-ngx/docs/platform/standard-list-item').then(configureLibRoutes)
    },
    {
        path: 'time-picker',
        loadChildren: () => import('@fundamental-ngx/docs/platform/time-picker').then(configureLibRoutes)
    },
    {
        path: 'action-list-item',
        loadChildren: () => import('@fundamental-ngx/docs/platform/action-list-item').then(configureLibRoutes)
    },
    {
        path: 'display-list-item',
        loadChildren: () => import('@fundamental-ngx/docs/platform/display-list-item').then(configureLibRoutes)
    },
    {
        path: 'object-list-item',
        loadChildren: () => import('@fundamental-ngx/docs/platform/object-list-item').then(configureLibRoutes)
    },
    {
        path: 'value-help-dialog',
        loadChildren: () => import('@fundamental-ngx/docs/platform/vhd').then(configureLibRoutes)
    },
    {
        path: 'multi-combobox',
        loadChildren: () => import('@fundamental-ngx/docs/platform/multi-combobox').then(configureLibRoutes)
    },
    {
        path: 'multi-input',
        loadChildren: () => import('@fundamental-ngx/docs/platform/multi-input').then(configureLibRoutes)
    },
    {
        path: 'feed-input',
        loadChildren: () => import('@fundamental-ngx/docs/platform/feed-input').then(configureLibRoutes)
    },
    {
        path: 'approval-flow',
        loadChildren: () => import('@fundamental-ngx/docs/platform/approval-flow').then(configureLibRoutes)
    },
    {
        path: 'slider',
        loadChildren: () => import('@fundamental-ngx/docs/platform/slider').then(configureLibRoutes)
    },
    {
        path: 'wizard-generator',
        loadChildren: () => import('@fundamental-ngx/docs/platform/wizard-generator').then(configureLibRoutes)
    },
    {
        path: 'icon-tab-bar',
        loadChildren: () => import('@fundamental-ngx/docs/platform/icon-tab-bar').then(configureLibRoutes)
    },
    {
        path: 'smart-filter-bar',
        loadChildren: () => import('@fundamental-ngx/docs/platform/smart-filter-bar').then(configureLibRoutes)
    },
    {
        path: 'message-popover',
        loadChildren: () => import('@fundamental-ngx/docs/platform/message-popover').then(configureLibRoutes)
    },
    {
        path: 'variant-management',
        loadChildren: () => import('@fundamental-ngx/docs/platform/variant-management').then(configureLibRoutes)
    },
    {
        path: 'settings-generator',
        loadChildren: () => import('@fundamental-ngx/docs/platform/settings-generator').then(configureLibRoutes)
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
                }
            ]
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
            ...componentRoutes
        ]
    }
];

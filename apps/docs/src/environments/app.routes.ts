import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: 'core',
        data: {
            library: 'Core'
        },
        loadChildren: () => import('@fundamental-ngx/docs/core')
    },
    {
        path: 'btp',
        data: {
            library: 'BTP'
        },
        loadChildren: () => import('@fundamental-ngx/docs/btp')
    },
    {
        path: 'platform',
        data: {
            library: 'Platform'
        },
        loadChildren: () => import('@fundamental-ngx/docs/platform')
    },
    {
        path: 'cx',
        data: {
            library: 'CX'
        },
        loadChildren: () => import('@fundamental-ngx/docs/cx')
    },
    {
        path: 'cdk',
        data: {
            library: 'CDK'
        },
        loadChildren: () => import('@fundamental-ngx/docs/cdk')
    },
    {
        path: 'i18n',
        data: {
            library: 'I18n'
        },
        loadChildren: () => import('@fundamental-ngx/docs/i18n')
    },
    {
        path: 'ui5-webcomponents',
        data: {
            library: 'Web Components Main'
        },
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents')
    },
    {
        path: 'ui5-webcomponents-ai',
        data: {
            library: 'Web Components AI'
        },
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents-ai')
    },
    {
        path: 'ui5-webcomponents-fiori',
        data: {
            library: 'Web Components Fiori'
        },
        loadChildren: () => import('@fundamental-ngx/docs/ui5-webcomponents-fiori')
    },
    { path: '', redirectTo: 'core', pathMatch: 'full' }
];

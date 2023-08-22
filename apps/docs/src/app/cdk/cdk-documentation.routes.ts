import { Routes } from '@angular/router';
import { HomeDocsComponent } from './component-docs/cdk-home/cdk-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { CDKDocumentationComponent } from './documentation/cdk-documentation.component';

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: CDKDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeDocsComponent },
            { path: 'new-component', component: NewComponentComponent },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/i18n').then((m) => m.PlatformI18nDocsModule)
            },
            {
                path: 'control-value-accessor',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/forms').then((m) => m.ROUTES)
            },
            {
                path: 'data-source',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/data-source').then((m) => m.ROUTES)
            },
            {
                path: 'drag-n-drop',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/drag-n-drop').then((m) => m.ROUTES)
            },
            {
                path: 'focusable-item',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/focusable-item').then((m) => m.ROUTES)
            },
            {
                path: 'selectable-list',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/selectable-list').then((m) => m.ROUTES)
            },
            {
                path: 'focusable-list',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/focusable-list').then((m) => m.ROUTES)
            },
            {
                path: 'focusable-grid',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/focusable-grid').then((m) => m.ROUTES)
            },
            {
                path: 'disabled',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/disabled').then((m) => m.ROUTES)
            },
            {
                path: 'clicked',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/clicked').then((m) => m.ROUTES)
            },
            {
                path: 'tabbable',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/tabbable').then((m) => m.ROUTES)
            },
            {
                path: 'initial-focus',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/initial-focus').then((m) => m.ROUTES)
            },
            {
                path: 'breakpoint',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/breakpoint').then((m) => m.ROUTES)
            }
        ]
    }
];

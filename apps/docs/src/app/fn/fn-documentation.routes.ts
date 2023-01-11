import { Routes } from '@angular/router';
import { CoreDocumentationComponent } from './documentation/fn-documentation.component';
import { HomeDocsComponent } from './component-docs/fn-home/fn-home.component';

// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
export const ROUTES: Routes = [
    {
        path: '',
        component: CoreDocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'i18n',
                loadChildren: () => import('@fundamental-ngx/docs/shared').then((m) => m.PlatformI18nDocsModule)
            },
            { path: 'home', component: HomeDocsComponent },
            {
                path: 'button',
                loadChildren: () => import('@fundamental-ngx/docs/fn/button').then((m) => m.ButtonDocsModule)
            },
            {
                path: 'checkbox',
                loadChildren: () => import('@fundamental-ngx/docs/fn/checkbox').then((m) => m.CheckboxDocsModule)
            },
            {
                path: 'generic-tag',
                loadChildren: () => import('@fundamental-ngx/docs/fn/generic-tag').then((m) => m.GenericTagDocsModule)
            },
            {
                path: 'select',
                loadChildren: () => import('@fundamental-ngx/docs/fn/select').then((m) => m.SelectDocsModule)
            },
            {
                path: 'tabs',
                loadChildren: () => import('@fundamental-ngx/docs/fn/tabs').then((m) => m.TabsDocsModule)
            },
            {
                path: 'switch',
                loadChildren: () => import('@fundamental-ngx/docs/fn/switch').then((m) => m.SwitchDocsModule)
            },
            {
                path: 'progress-bar',
                loadChildren: () => import('@fundamental-ngx/docs/fn/progress-bar').then((m) => m.ProgressBarDocsModule)
            },
            {
                path: 'radio',
                loadChildren: () => import('@fundamental-ngx/docs/fn/radio').then((m) => m.RadioDocsModule)
            },
            {
                path: 'input',
                loadChildren: () => import('@fundamental-ngx/docs/fn/input').then((m) => m.InputDocsModule)
            },
            {
                path: 'search',
                loadChildren: () => import('@fundamental-ngx/docs/fn/search').then((m) => m.SearchDocsModule)
            },
            {
                path: 'slider',
                loadChildren: () => import('@fundamental-ngx/docs/fn/slider').then((m) => m.SliderDocsModule)
            },
            {
                path: 'segmented-button',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/fn/segmented-button').then((m) => m.SegmentedButtonDocsModule)
            },
            {
                path: 'list',
                loadChildren: () => import('@fundamental-ngx/docs/fn/list').then((m) => m.ListDocsModule)
            },
            {
                path: 'list-byline',
                loadChildren: () => import('@fundamental-ngx/docs/fn/list-byline').then((m) => m.ListBylineDocsModule)
            },
            {
                path: 'avatar',
                loadChildren: () => import('@fundamental-ngx/docs/fn/avatar').then((m) => m.AvatarDocsModule)
            },
            {
                path: 'info-label',
                loadChildren: () => import('@fundamental-ngx/docs/fn/info-label').then((m) => m.InfoLabelDocsModule)
            },
            {
                path: 'message-strip',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/fn/message-strip').then((m) => m.MessageStripDocsModule)
            },
            {
                path: 'object-status',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/fn/object-status').then((m) => m.ObjectStatusDocsModule)
            },
            {
                path: 'message-toast',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/fn/message-toast').then((m) => m.MessageToastDocsModule)
            },
            {
                path: 'notification',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/fn/notification').then((m) => m.NotificationDocsModule)
            }
        ]
    }
];

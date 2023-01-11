import { Routes } from '@angular/router';
import { CDKDocumentationComponent } from './documentation/cdk-documentation.component';
import { HomeDocsComponent } from './component-docs/cdk-home/cdk-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

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
                loadChildren: () => import('@fundamental-ngx/docs/shared').then((m) => m.PlatformI18nDocsModule)
            },
            {
                path: 'control-value-accessor',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/forms').then((m) => m.FormsDocsModule)
            },
            {
                path: 'data-source',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/data-source').then((m) => m.DataSourceDocsModule)
            },
            {
                path: 'focusable-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/focusable-item').then((m) => m.FocusableItemDocsModule)
            },
            {
                path: 'selectable-list',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/selectable-list').then((m) => m.SelectableListDocsModule)
            },
            {
                path: 'focusable-list',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/focusable-list').then((m) => m.FocusableListDocsModule)
            },
            {
                path: 'disabled',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/disabled').then((m) => m.DisabledDocsModule)
            },
            {
                path: 'clicked',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/clicked').then((m) => m.ClickedDocsModule)
            },
            {
                path: 'tabbable',
                loadChildren: () => import('@fundamental-ngx/docs/cdk/tabbable').then((m) => m.TabbableDocsModule)
            },
            {
                path: 'initial-focus',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/initial-focus').then((m) => m.InitialFocusDocsModule)
            }
        ]
    }
];

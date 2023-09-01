import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { configureRoutes } from '@fundamental-ngx/docs/shared';
import { HomeDocsComponent } from './component-docs/cdk-home/cdk-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { CDKDocumentationComponent } from './documentation/cdk-documentation.component';

const configureCdkRoutes = (config: {
    apiFilesKey: keyof typeof API_FILES;
}): ((params: { ROUTES: Routes; LIBRARY_NAME: string }) => Routes) =>
    configureRoutes({
        apiFiles: API_FILES,
        ...config
    });

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
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/forms').then(configureCdkRoutes({ apiFilesKey: 'forms' }))
            },
            {
                path: 'data-source',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/data-source').then(
                        configureCdkRoutes({ apiFilesKey: 'dataSource' })
                    )
            },
            {
                path: 'drag-n-drop',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/drag-n-drop').then(configureCdkRoutes({ apiFilesKey: 'dnd' }))
            },
            {
                path: 'focusable-item',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/focusable-item').then(
                        configureCdkRoutes({ apiFilesKey: 'focusableItem' })
                    )
            },
            {
                path: 'selectable-list',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/selectable-list').then(
                        configureCdkRoutes({ apiFilesKey: 'selectableList' })
                    )
            },
            {
                path: 'focusable-list',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/focusable-list').then(
                        configureCdkRoutes({ apiFilesKey: 'focusableList' })
                    )
            },
            {
                path: 'focusable-grid',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/focusable-grid').then(
                        configureCdkRoutes({ apiFilesKey: 'focusableGrid' })
                    )
            },
            {
                path: 'disabled',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/disabled').then(configureCdkRoutes({ apiFilesKey: 'disabled' }))
            },
            {
                path: 'clicked',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/clicked').then(configureCdkRoutes({ apiFilesKey: 'clicked' }))
            },
            {
                path: 'tabbable',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/tabbable').then(configureCdkRoutes({ apiFilesKey: 'tabbable' }))
            },
            {
                path: 'initial-focus',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/initial-focus').then(
                        configureCdkRoutes({ apiFilesKey: 'initialFocus' })
                    )
            },
            {
                path: 'breakpoint',
                loadChildren: () =>
                    import('@fundamental-ngx/docs/cdk/breakpoint').then(
                        configureCdkRoutes({ apiFilesKey: 'breakpoint' })
                    )
            }
        ]
    }
];

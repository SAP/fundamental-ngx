import { Routes } from '@angular/router';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    ApiDocsService,
    ExampleChildService,
    I18nDocsComponent,
    currentComponentProvider,
    getI18nKey
} from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-table-header/platform-table-header.component').then(
                (c) => c.PlatformTableHeaderComponent
            ),
        providers: [currentComponentProvider('table'), ApiDocsService, ExampleChildService, RtlService],
        children: [
            { path: '', redirectTo: 'basic', pathMatch: 'full' },
            {
                path: 'basic',
                loadComponent: () => import('./platform-table-docs.component').then((c) => c.PlatformTableDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.table } },
            {
                path: 'i18n',
                component: I18nDocsComponent,
                data: getI18nKey('platformTable')
            },
            {
                path: 'p13-dialog-table',
                loadComponent: () =>
                    import('./child-docs/p13-dialog/p13-dialog-docs.component').then((c) => c.P13DialogDocsComponent)
            },
            {
                path: 'settings-dialog-table',
                loadComponent: () =>
                    import('./child-docs/settings-dialog/settings-dialog-docs.component').then(
                        (c) => c.SettingsDialogDocsComponent
                    )
            },
            {
                path: 'scrolling',
                loadComponent: () =>
                    import('./child-docs/scrolling/table-scrolling-docs.component').then(
                        (c) => c.TableScrollingDocsComponent
                    )
            },
            {
                path: 'row-selection',
                loadComponent: () =>
                    import('./child-docs/row-selection/row-selection-docs.component').then(
                        (c) => c.RowSelectionDocsComponent
                    )
            },
            {
                path: 'clickable-rows',
                loadComponent: () =>
                    import('./child-docs/clickable-rows/clickable-rows-docs.component').then(
                        (c) => c.ClickableRowsDocsComponent
                    )
            },
            {
                path: 'preserved-state',
                loadComponent: () =>
                    import('./child-docs/preserving-state/preserved-state-docs.component').then(
                        (c) => c.PreservedStateDocsComponent
                    )
            },
            {
                path: 'advanced',
                loadComponent: () =>
                    import('./child-docs/advanced/advanced-examples-docs.component').then(
                        (c) => c.AdvancedExamplesDocsComponent
                    )
            }
        ]
    }
];

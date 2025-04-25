import { Routes } from '@angular/router';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ExampleChildService } from '@fundamental-ngx/docs/shared';
import { PlatformTableHeaderComponent } from './platform-table-header/platform-table-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformTableHeaderComponent,
        providers: [ExampleChildService, RtlService],
        children: [
            {
                path: 'basic',
                loadComponent: () => import('./platform-table-docs.component').then((c) => c.PlatformTableDocsComponent)
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
            },
            {
                path: 'pagination',
                loadComponent: () =>
                    import('./child-docs/pagination/table-pagination-docs.component').then(
                        (c) => c.TablePaginationDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'table';
export const API_FILE_KEY = 'table';
export const I18N_KEY = 'platformTable';

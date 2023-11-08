import { Routes } from '@angular/router';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ExampleChildService } from '@fundamental-ngx/docs/shared';
import { AdvancedExamplesDocsComponent } from './child-docs/advanced/advanced-examples-docs.component';
import { ClickableRowsDocsComponent } from './child-docs/clickable-rows/clickable-rows-docs.component';
import { P13DialogDocsComponent } from './child-docs/p13-dialog/p13-dialog-docs.component';
import { PreservedStateDocsComponent } from './child-docs/preserving-state/preserved-state-docs.component';
import { RowSelectionDocsComponent } from './child-docs/row-selection/row-selection-docs.component';
import { TableScrollingDocsComponent } from './child-docs/scrolling/table-scrolling-docs.component';
import { SettingsDialogDocsComponent } from './child-docs/settings-dialog/settings-dialog-docs.component';
import { PlatformTableDocsComponent } from './platform-table-docs.component';
import { PlatformTableHeaderComponent } from './platform-table-header/platform-table-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformTableHeaderComponent,
        providers: [ExampleChildService, RtlService],
        children: [
            {
                path: '',
                redirectTo: 'basic',
                pathMatch: 'full'
            },
            {
                path: 'basic',
                component: PlatformTableDocsComponent
            },
            {
                path: 'p13-dialog-table',
                component: P13DialogDocsComponent
            },
            {
                path: 'settings-dialog-table',
                component: SettingsDialogDocsComponent
            },
            {
                path: 'scrolling',
                component: TableScrollingDocsComponent
            },
            {
                path: 'row-selection',
                component: RowSelectionDocsComponent
            },
            {
                path: 'clickable-rows',
                component: ClickableRowsDocsComponent
            },
            {
                path: 'preserved-state',
                component: PreservedStateDocsComponent
            },
            {
                path: 'advanced',
                component: AdvancedExamplesDocsComponent
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

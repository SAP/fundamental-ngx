import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { SelectModule } from '@fundamental-ngx/core/select';

import { TableModule } from '@fundamental-ngx/core/table';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { BreakpointDirective, RtlService } from '@fundamental-ngx/cdk/utils';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformInputModule } from '@fundamental-ngx/platform/form';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';

import { PlatformTableHeaderComponent } from './platform-table-header/platform-table-header.component';
import { PlatformTableDocsComponent } from './platform-table-docs.component';
import { PlatformTableDefaultExampleComponent } from './examples/platform-table-default-example.component';
import { PlatformTableCustomColumnExampleComponent } from './examples/platform-table-custom-column-example.component';
import { PlatformTableCustomTitleExampleComponent } from './examples/platform-table-custom-title-example.component';
import { PlatformTableMultipleRowSelectionExampleComponent } from './examples/platform-table-multiple-row-selection-example.component';
import { PlatformTableSingleRowSelectionExampleComponent } from './examples/platform-table-single-row-selection-example.component';
import { PlatformTableSortableExampleComponent } from './examples/platform-table-sortable-example.component';
import { PlatformTableFilterableExampleComponent } from './examples/platform-table-filterable-example.component';
import { PlatformTableGroupableExampleComponent } from './examples/platform-table-groupable-example.component';
import { PlatformTableFreezableExampleComponent } from './examples/platform-table-freezable-example.component';
import { PlatformTablePageScrollingExampleComponent } from './examples/platform-table-page-scrolling-example.component';
import { PlatformTableInitialStateExampleComponent } from './examples/platform-table-initial-state-example.component';
import { PlatformTableP13ColumnsExampleComponent } from './examples/platform-table-p13-columns-example.component';
import { PlatformTableP13FilterExampleComponent } from './examples/platform-table-p13-filter-example.component';
import { PlatformTableP13GroupExampleComponent } from './examples/platform-table-p13-group-example.component';
import { PlatformTableP13SortExampleComponent } from './examples/platform-table-p13-sort-example.component';
import { PlatformTableTreeExampleComponent } from './examples/platform-table-tree-example.component';
import { PlatformTableLoadingExampleComponent } from './examples/platform-table-loading-example.component';
import { PlatformTableNavigatableRowIndicatorExampleComponent } from './examples/platform-table-navigatable-row-indicator-example.component';
import { PlatformTableCustomWidthExampleComponent } from './examples/platform-table-custom-width-example.component';
import { PlatformTableActivableExampleComponent } from './examples/platform-table-activable-example.component';
import { PlatformTableNoItemsTemplateExampleComponent } from './examples/platform-table-no-items-template-example.component';
import { PlatformTableSemanticExampleComponent } from './examples/platform-table-semantic-example.component';
import { PlatformTableRowClassExampleComponent } from './examples/platform-table-row-class-example.component';
import { PlatformTableNoOuterBordersExampleComponent } from './examples/platform-table-no-outer-borders-example.component';
import { PlatformTableWrapExampleComponent } from './examples/platform-table-wrap-example.component';
import { PlatformTableEditableRowsExampleComponent } from './examples/editable-rows/platform-table-editable-rows-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';
import { PlatformTableResponsiveColumnsExampleComponent } from './examples/platform-table-responsive-columns-example.component';
import { PlatformTableInitialLoadingExampleComponent } from './examples/initial-loading/platform-table-initial-loading-example.component';
import { PlatformTableColumnsNgforExampleComponent } from './examples/platform-table-columns-ngfor-example.component';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformTableVirtualScrollExampleComponent } from './examples/virtual-scroll/platform-table-virtual-scroll-example.component';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

const routes: Routes = [
    {
        path: '',
        component: PlatformTableHeaderComponent,
        children: [
            { path: '', component: PlatformTableDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.table } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformTable') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormsModule,
        CdkTableModule,
        TableModule,
        PlatformTableModule,
        PlatformButtonModule,
        ObjectStatusModule,
        LayoutPanelModule,
        FdDatetimeModule,
        PlatformInputModule,
        PlatformSearchFieldModule,
        IllustratedMessageModule,
        FdpFormGroupModule,
        SelectModule,
        SegmentedButtonModule,
        ToolbarModule,
        BreakpointDirective,
        PlatformMenuModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformTableDocsComponent,
        PlatformTableHeaderComponent,
        PlatformTableDefaultExampleComponent,
        PlatformTableCustomColumnExampleComponent,
        PlatformTableCustomTitleExampleComponent,
        PlatformTableSingleRowSelectionExampleComponent,
        PlatformTableMultipleRowSelectionExampleComponent,
        PlatformTableSortableExampleComponent,
        PlatformTableFilterableExampleComponent,
        PlatformTableGroupableExampleComponent,
        PlatformTableFreezableExampleComponent,
        PlatformTablePageScrollingExampleComponent,
        PlatformTableInitialStateExampleComponent,
        PlatformTableP13ColumnsExampleComponent,
        PlatformTableP13SortExampleComponent,
        PlatformTableP13FilterExampleComponent,
        PlatformTableP13GroupExampleComponent,
        PlatformTableTreeExampleComponent,
        PlatformTableLoadingExampleComponent,
        PlatformTableNavigatableRowIndicatorExampleComponent,
        PlatformTableCustomWidthExampleComponent,
        PlatformTableActivableExampleComponent,
        PlatformTableNoItemsTemplateExampleComponent,
        PlatformTableSemanticExampleComponent,
        PlatformTableRowClassExampleComponent,
        PlatformTableNoOuterBordersExampleComponent,
        PlatformTableWrapExampleComponent,
        PlatformTableEditableRowsExampleComponent,
        PlatformTableResponsiveColumnsExampleComponent,
        PlatformTableInitialLoadingExampleComponent,
        PlatformTableColumnsNgforExampleComponent,
        PlatformTableVirtualScrollExampleComponent
    ],
    providers: [
        RtlService,
        platformContentDensityModuleDeprecationsProvider('fdp-table'),
        currentComponentProvider('table')
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformTableDocsModule {}

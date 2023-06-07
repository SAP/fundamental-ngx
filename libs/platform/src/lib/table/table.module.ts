import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { ListModule } from '@fundamental-ngx/core/list';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { SelectModule } from '@fundamental-ngx/core/select';
import { TableModule } from '@fundamental-ngx/core/table';
import { ClickedBehaviorModule, DisabledBehaviorModule, PipeModule, RepeatModule } from '@fundamental-ngx/cdk/utils';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { PlatformDatePickerModule, PlatformInputModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';
import { PlatformListModule } from '@fundamental-ngx/platform/list';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TableHelpersModule } from '@fundamental-ngx/platform/table-helpers';

import { TableComponent } from './table.component';
import { TableColumnComponent } from './components';
import { TableToolbarComponent } from './components';
import { TableToolbarActionsComponent } from './components';
import { ResetButtonComponent } from './components';
import { TableViewSettingsDialogComponent } from './components';
import { TableViewSettingsFilterComponent } from './components';
import { SortingComponent } from './components';
import { GroupingComponent } from './components';
import { FiltersComponent } from './components';
import { FiltersListStepComponent } from './components';
import { FilterStepComponent } from './components';
import { FilterSingleSelectComponent } from './components';
import { FilterMultiSelectComponent } from './components';
import { FilterCustomComponent } from './components';
import { TableP13DialogComponent } from './components';
import { TableP13SortComponent } from './components';
import { TableP13FilterComponent } from './components';
import { TableP13GroupComponent } from './components';
import { TableP13ColumnsComponent } from './components';
import {
    P13SortingDialogComponent,
    GetAvailableSortColumnsPipe
} from './components/table-p13-dialog/sorting/sorting.component';
import { P13GroupingDialogComponent } from './components';
import { P13FilteringDialogComponent } from './components';
import { FilterRuleComponent } from './components';
import { P13ColumnsDialogComponent } from './components';

import { PlatformTableColumnResizerComponent } from './components';
import { NoDataWrapperComponent } from './components';
import { TableEditableCellComponent } from './components/table-editable-cell/table-editable-cell.component';
import { TableToolbarLeftActionsComponent } from './components/table-toolbar/table-toolbar-left-actions.component';

import { TableHeaderCellContentComponent } from './components';
import { TableCellHeaderPopoverComponent } from './components';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TableGroupRowComponent } from './components/table-group-row/table-group-row.component';
import { TablePoppingRowComponent } from './components/table-popping-row/table-popping-row.component';
import { TableRowSelectionCellComponent } from './components/table-row-selection-cell/table-row-selection-cell.component';
import { TableHeaderRowComponent } from './components/table-header-row/table-header-row.component';

const EXPORTABLE_DECLARATIONS = [
    TableComponent,
    TableColumnComponent,
    TableToolbarComponent,
    TableToolbarActionsComponent,
    TableViewSettingsDialogComponent,
    TableViewSettingsFilterComponent,
    SortingComponent,
    GroupingComponent,
    FiltersComponent,
    FiltersListStepComponent,
    FilterStepComponent,
    FilterSingleSelectComponent,
    FilterMultiSelectComponent,
    FilterCustomComponent,
    ResetButtonComponent,
    TableP13DialogComponent,
    TableP13SortComponent,
    TableP13FilterComponent,
    TableP13GroupComponent,
    TableP13ColumnsComponent,
    P13SortingDialogComponent,
    P13GroupingDialogComponent,
    P13FilteringDialogComponent,
    FilterRuleComponent,
    P13ColumnsDialogComponent,
    PlatformTableColumnResizerComponent,
    NoDataWrapperComponent,
    GetAvailableSortColumnsPipe,
    TableEditableCellComponent,
    TableToolbarLeftActionsComponent,
    TableHeaderCellContentComponent,
    TableCellHeaderPopoverComponent,
    TableRowComponent,
    TableGroupRowComponent,
    TablePoppingRowComponent,
    TableRowSelectionCellComponent,
    TableHeaderRowComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ToolbarModule,
        FormModule,
        CheckboxModule,
        RadioModule,
        InputGroupModule,
        PopoverModule,
        ListModule,
        PlatformButtonModule,
        PipeModule,
        ButtonModule,
        PlatformInputModule,
        DialogModule,
        PlatformSearchFieldModule,
        IconModule,
        I18nModule,
        SelectModule,
        LayoutGridModule,
        PanelModule,
        DatePickerModule,
        BusyIndicatorModule,
        DragAndDropModule,
        ScrollbarModule,
        PlatformDatePickerModule,
        PlatformSwitchModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule,
        SkeletonModule,
        RepeatModule,
        DisabledBehaviorModule,
        PlatformListModule,
        ClickedBehaviorModule.forRoot(),
        TableHelpersModule
    ],
    declarations: [...EXPORTABLE_DECLARATIONS],
    exports: [...EXPORTABLE_DECLARATIONS]
})
export class PlatformTableModule {}

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
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DragAndDropModule } from '@fundamental-ngx/core/utils';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { PlatformInputModule } from '@fundamental-ngx/platform/form';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';

import { TableComponent } from './table.component';
import { TableColumnComponent } from './components/table-column/table-column.component';
import { TableToolbarComponent } from './components/table-toolbar/table-toolbar.component';
import { TableToolbarActionsComponent } from './components/table-toolbar/table-toolbar-actions.component';
import { ResetButtonComponent } from './components/reset-button/reset-button.component';
import { TableViewSettingsDialogComponent } from './components/table-view-settings-dialog/table-view-settings-dialog.component';
import { TableViewSettingsFilterComponent } from './components/table-view-settings-dialog/table-view-settings-filter.component';
import { SortingComponent } from './components/table-view-settings-dialog/sorting/sorting.component';
import { GroupingComponent } from './components/table-view-settings-dialog/grouping/grouping.component';
import { FiltersComponent } from './components/table-view-settings-dialog/filtering/filters.component';
import { FiltersListStepComponent } from './components/table-view-settings-dialog/filtering/filters-list-step.component';
import { FilterStepComponent } from './components/table-view-settings-dialog/filtering/filter-step.component';
import { FilterSingleSelectComponent } from './components/table-view-settings-dialog/filtering/filter-single-select.component';
import { FilterMultiSelectComponent } from './components/table-view-settings-dialog/filtering/filter-multi-select.component';
import { FilterCustomComponent } from './components/table-view-settings-dialog/filtering/filter-custom.component';
import { TableP13DialogComponent } from './components/table-p13-dialog/table-p13-dialog.component';
import { TableP13SortComponent } from './components/table-p13-dialog/table-p13-sort.component';
import { TableP13FilterComponent } from './components/table-p13-dialog/table-p13-filter.component';
import { TableP13GroupComponent } from './components/table-p13-dialog/table-p13-group.component';
import { TableP13ColumnsComponent } from './components/table-p13-dialog/table-p13-columns.component';
import {
    P13SortingDialogComponent,
    GetAvailableSortColumnsPipe
} from './components/table-p13-dialog/sorting/sorting.component';
import { P13GroupingDialogComponent } from './components/table-p13-dialog/grouping/grouping.component';
import { P13FilteringDialogComponent } from './components/table-p13-dialog/filtering/filtering.component';
import { FilterRuleComponent } from './components/table-p13-dialog/filtering/filter-rule.component';
import { P13ColumnsDialogComponent } from './components/table-p13-dialog/columns/columns.component';

import { FdpCellDef, FdpTableCell } from './directives/table-cell.directive';
import { FdpHeaderCellDef, FdpTableHeader } from './directives/table-header.directive';
import { FdpViewSettingsFilterCustomDef } from './directives/table-view-settings-filter-custom.directive';
import { TableScrollableDirective } from './directives/table-scrollable.directive';
import { TableScrollerDirective } from './directives/table-scroller.directive';
import { FdpCellSelectableDirective } from './directives/table-cell-selectable.directive';
import { PlatformTableCellResizableDirective } from './directives/table-cell-resizable.directive';
import { PlatformTableColumnResizerComponent } from './components/table-column-resizer/table-column-resizer.component';
import { NoDataWrapperComponent } from './components/no-data-wrapper/no-data-wrapper.component';

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
        SelectModule,
        LayoutGridModule,
        PanelModule,
        DatePickerModule,
        BusyIndicatorModule,
        DragAndDropModule,
        ScrollbarModule
    ],
    declarations: [
        TableComponent,
        TableColumnComponent,
        TableToolbarComponent,
        TableToolbarActionsComponent,
        FdpTableCell,
        FdpCellDef,
        FdpCellSelectableDirective,
        FdpTableHeader,
        FdpHeaderCellDef,
        TableViewSettingsDialogComponent,
        TableViewSettingsFilterComponent,
        FdpViewSettingsFilterCustomDef,
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
        TableScrollableDirective,
        TableScrollerDirective,
        PlatformTableCellResizableDirective,
        PlatformTableColumnResizerComponent,
        NoDataWrapperComponent,
        GetAvailableSortColumnsPipe
    ],
    exports: [
        TableComponent,
        TableColumnComponent,
        TableToolbarComponent,
        TableToolbarActionsComponent,
        FdpTableCell,
        FdpCellDef,
        FdpCellSelectableDirective,
        FdpTableHeader,
        FdpHeaderCellDef,
        TableViewSettingsDialogComponent,
        TableViewSettingsFilterComponent,
        FdpViewSettingsFilterCustomDef,
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
        TableScrollableDirective,
        TableScrollerDirective,
        PlatformTableCellResizableDirective,
        PlatformTableColumnResizerComponent,
        NoDataWrapperComponent,
        GetAvailableSortColumnsPipe
    ]
})
export class PlatformTableModule {}

import { NgModule } from '@angular/core';

import { TableHelpersModule } from '@fundamental-ngx/platform/table-helpers';

import {
    FilterCustomComponent,
    FilterMultiSelectComponent,
    FilterRuleComponent,
    FilterSingleSelectComponent,
    FilterStepComponent,
    FiltersComponent,
    FiltersListStepComponent,
    GroupingComponent,
    P13ColumnsDialogComponent,
    P13FilteringDialogComponent,
    P13GroupingDialogComponent,
    ResetButtonComponent,
    SortingComponent,
    TableColumnComponent,
    TableP13ColumnsComponent,
    TableP13DialogComponent,
    TableP13FilterComponent,
    TableP13GroupComponent,
    TableP13SortComponent,
    TableToolbarActionsComponent,
    TableToolbarComponent,
    TableViewSettingsDialogComponent,
    TableViewSettingsFilterComponent
} from './components';
import {
    GetAvailableSortColumnsPipe,
    P13SortingDialogComponent
} from './components/table-p13-dialog/sorting/sorting.component';
import { TableComponent } from './table.component';

import { NoDataWrapperComponent, PlatformTableColumnResizerComponent } from './components';
import { TableEditableCellComponent } from './components/table-editable-cell/table-editable-cell.component';
import { TableToolbarLeftActionsComponent } from './components/table-toolbar/table-toolbar-left-actions.component';

import { TableCellHeaderPopoverComponent, TableHeaderCellContentComponent } from './components';
import { TableGrowingButtonComponent } from './components/growing-button/table-growing-button.component';
import { TableFooterRowComponent } from './components/table-footer-row/table-footer-row.component';
import { TableGroupRowComponent } from './components/table-group-row/table-group-row.component';
import {
    IsColumnHasHeaderMenuPipe,
    TableHeaderRowComponent
} from './components/table-header-row/table-header-row.component';
import { TablePoppingRowComponent } from './components/table-popping-row/table-popping-row.component';
import { TableRowComponent } from './components/table-row/table-row.component';

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
    TableHeaderRowComponent,
    IsColumnHasHeaderMenuPipe,
    TableGrowingButtonComponent,
    TableFooterRowComponent
];

@NgModule({
    imports: [...EXPORTABLE_DECLARATIONS, TableHelpersModule],
    exports: [...EXPORTABLE_DECLARATIONS, TableHelpersModule]
})
export class PlatformTableModule {}

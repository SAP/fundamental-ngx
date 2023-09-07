import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    ClickedBehaviorModule,
    DisabledBehaviorModule,
    DragAndDropModule,
    IntersectionSpyDirective,
    PipeModule,
    RepeatModule
} from '@fundamental-ngx/cdk/utils';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
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
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { SelectModule } from '@fundamental-ngx/core/select';
import { TableModule } from '@fundamental-ngx/core/table';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformDatePickerModule, PlatformInputModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';
import { PlatformListModule } from '@fundamental-ngx/platform/list';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
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
    IsColumnHasHeaderMenuPipe
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
        ContentDensityModule,
        SkeletonModule,
        RepeatModule,
        DisabledBehaviorModule,
        PlatformListModule,
        ClickedBehaviorModule.forRoot(),
        TableHelpersModule,
        IntersectionSpyDirective
    ],
    declarations: [...EXPORTABLE_DECLARATIONS],
    exports: [...EXPORTABLE_DECLARATIONS, TableHelpersModule]
})
export class PlatformTableModule {}

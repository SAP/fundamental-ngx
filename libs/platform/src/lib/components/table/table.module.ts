import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    ButtonModule,
    CheckboxModule,
    FormModule,
    SelectModule,
    RadioModule,
    InputGroupModule,
    DialogModule,
    IconModule,
    ListModule,
    PopoverModule,
    TableModule,
    ToolbarModule,
    LayoutGridModule,
    PanelModule,
    DatePickerModule,
    BusyIndicatorModule
} from '@fundamental-ngx/core';

import { PlatformInputModule } from '../form/input/fdp-input.module';
import { PlatformButtonModule } from '../button/button.module';
import { PlatformSearchFieldModule } from '../search-field/search-field.module';

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
import { P13SortingDialogComponent } from './components/table-p13-dialog/sorting/sorting.component';
import { P13GroupingDialogComponent } from './components/table-p13-dialog/grouping/grouping.component';
import { P13FilteringDialogComponent } from './components/table-p13-dialog/filtering/filtering.component';
import { FilterRuleComponent } from './components/table-p13-dialog/filtering/filter-rule.component';
import { P13ColumnsDialogComponent } from './components/table-p13-dialog/columns/columns.component';

import {
    FdpCellDef,
    FdpCellSelectableDirective,
    FdpHeaderCellDef,
    FdpTableCell,
    FdpTableHeader,
    FdpViewSettingsFilterCustomDef,
    TableScrollableDirective,
    TableScrollerDirective
} from './directives';
import { ValueByPathPipe } from './pipes';

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
        ButtonModule,
        PlatformInputModule,
        DialogModule,
        PlatformSearchFieldModule,
        IconModule,
        SelectModule,
        LayoutGridModule,
        PanelModule,
        DatePickerModule,
        BusyIndicatorModule
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
        ValueByPathPipe,
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
        TableScrollerDirective
    ],
    exports: [
        TableComponent,
        TableColumnComponent,
        TableToolbarComponent,
        TableToolbarActionsComponent,
        FdpTableCell,
        FdpCellDef,
        FdpTableHeader,
        FdpHeaderCellDef,
        TableViewSettingsDialogComponent,
        TableViewSettingsFilterComponent,
        FdpViewSettingsFilterCustomDef,
        TableP13DialogComponent,
        TableP13SortComponent,
        TableP13FilterComponent,
        TableP13GroupComponent,
        TableP13ColumnsComponent
    ],
    entryComponents: [
        SortingComponent,
        GroupingComponent,
        FiltersComponent,
        P13SortingDialogComponent,
        P13GroupingDialogComponent,
        P13FilteringDialogComponent,
        P13ColumnsDialogComponent
    ]
})
export class PlatformTableModule {}

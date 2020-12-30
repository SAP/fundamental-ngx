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
    DatePickerModule
} from '@fundamental-ngx/core';

import { PlatformInputModule } from '../form/input/fdp-input.module';
import { PlatformButtonModule } from '../button/button.module';
import { PlatformSearchFieldModule } from '../search-field/search-field.module';

import { TableComponent } from './table.component';
import {
    GroupingComponent,
    SortingComponent,
    FiltersComponent,
    FiltersListStepComponent,
    FilterStepComponent,
    FilterSingleSelectComponent,
    FilterMultiSelectComponent,
    FilterCustomComponent,
    ResetButtonComponent,
    TableColumnComponent,
    TableToolbarActionsComponent,
    TableToolbarComponent,
    TableViewSettingsDialogComponent,
    TableViewSettingsFilterComponent,
    TableP13DialogComponent,
    TableP13SortComponent,
    TableP13FilterComponent,
    TableP13GroupComponent,
    TableP13ColumnsComponent,
    P13SortingDialogComponent,
    P13GroupingDialogComponent,
    P13FilteringDialogComponent,
    FilterRuleComponent,
    P13ColumnsDialogComponent
} from './components';
import {
    FdpCellDef,
    FdpHeaderCellDef,
    FdpTableCell,
    FdpTableHeader,
    FdpViewSettingsFilterCustomDef
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
        DatePickerModule
    ],
    declarations: [
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
        P13ColumnsDialogComponent
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
    ]
})
export class PlatformTableModule {}

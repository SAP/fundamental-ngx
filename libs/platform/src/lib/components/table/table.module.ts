import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ButtonModule,
    CheckboxModule,
    DialogModule,
    FormModule,
    IconModule,
    InputGroupModule,
    ListModule,
    PopoverModule,
    RadioModule,
    TableModule,
    ToolbarModule,
    SelectModule
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
    TableViewSettingsFilterComponent
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
        ReactiveFormsModule,
        FormModule,

        TableModule,
        ToolbarModule,
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
        SelectModule
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
        ResetButtonComponent
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
        FdpViewSettingsFilterCustomDef
    ]
})
export class PlatformTableModule {}

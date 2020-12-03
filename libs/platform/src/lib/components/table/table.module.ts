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
    ToolbarModule
} from '@fundamental-ngx/core';

import { FdpFormGroupModule } from '../form/form-group/fdp-form.module';
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
    ViewSettingsResetButtonComponent,
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
import { CellValueByPipe } from './pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ToolbarModule,
        CheckboxModule,
        PopoverModule,
        ListModule,
        PlatformButtonModule,
        ButtonModule,
        ListModule,
        FormModule,
        FdpFormGroupModule,
        PlatformInputModule,
        PopoverModule,
        DialogModule,
        RadioModule,
        PlatformSearchFieldModule,

        InputGroupModule,
        RadioModule,
        IconModule
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
        CellValueByPipe,
        SortingComponent,
        GroupingComponent,
        FiltersComponent,
        FiltersListStepComponent,
        FilterStepComponent,
        FilterSingleSelectComponent,
        FilterMultiSelectComponent,
        FilterCustomComponent,
        ViewSettingsResetButtonComponent
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

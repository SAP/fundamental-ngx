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

import { TableService } from './table.service';
import { TableComponent } from './table.component';
import {
    SortingComponent,
    TableColumnComponent,
    TableToolbarActionsComponent,
    TableToolbarComponent,
    TableViewSettingsDialogComponent,
    TableViewSettingsFilterComponent
} from './components';
import { FdpCellDef, FdpHeaderCellDef, FdpTableCell, FdpTableHeader } from './directives';
import { TableSortByPipe } from './pipes';

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
        IconModule,

        InputGroupModule
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
        TableSortByPipe,

        SortingComponent
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
        TableSortByPipe
    ],
    providers: [ TableService ]
})
export class PlatformTableModule {}

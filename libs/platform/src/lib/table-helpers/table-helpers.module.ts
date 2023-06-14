import { NgModule } from '@angular/core';
import {
    FdpCellSelectableDirective,
    FdpTableCell,
    FdpTableHeader,
    FdpViewSettingsFilterCustomDef,
    PlatformTableCellResizableDirective,
    PlatformTableColumnResponsiveDirective,
    TableCellHeaderPopoverDirective,
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableScrollableDirective,
    TableDraggableDirective,
    TableInitialStateDirective,
    TableVirtualScrollDirective,
    FdpCellDef,
    FdpEditableCellFormDirective,
    FdpEditableCellDef,
    FdpHeaderCellDef
} from './directives';
import { ColumnResizableSidePipe, RowClassesPipe, SelectionCellStylesPipe, TableCellStylesPipe } from './pipes';

const importExports = [
    TableInitialStateDirective,
    TableDraggableDirective,
    TableVirtualScrollDirective,
    PlatformTableColumnResponsiveDirective,
    FdpTableCell,
    TableCellHeaderPopoverDirective,
    PlatformTableCellResizableDirective,
    FdpCellSelectableDirective,
    TableDataSourceDirective,
    TableDraggableDirective,
    FdpTableHeader,
    TableHeaderResizerDirective,
    TableInitialStateDirective,
    TableScrollableDirective,
    FdpCellDef,
    FdpEditableCellDef,
    FdpEditableCellFormDirective,
    FdpViewSettingsFilterCustomDef,
    TableVirtualScrollDirective,
    FdpHeaderCellDef,
    SelectionCellStylesPipe,
    TableCellStylesPipe,
    ColumnResizableSidePipe,
    RowClassesPipe
];

@NgModule({
    imports: [...importExports],
    exports: [...importExports]
})
export class TableHelpersModule {}

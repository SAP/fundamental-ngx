import { NgModule } from '@angular/core';
import {
    FdpCellDef,
    FdpEditableCellDef,
    FdpEditableCellFormDirective,
    FdpHeaderCellDef,
    FdpTableCell,
    FdpTableHeader,
    FdpViewSettingsFilterCustomDef,
    PlatformTableCellResizableDirective,
    PlatformTableColumnResponsiveDirective,
    TableCellHeaderPopoverDirective,
    TableDataSourceDirective,
    TableDraggableDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective,
    TableScrollableDirective,
    TableVirtualScrollDirective
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

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...importExports],
    exports: [...importExports]
})
export class TableHelpersModule {}

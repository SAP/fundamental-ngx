import { TemplateRef } from '@angular/core';

import { ColumnAlignValue } from '../../enums/column-align.enum';
import { FilterableColumnDataType } from '../../enums/filter-type.enum';
import { FdpColumnResponsiveState } from '../../interfaces/column-responsive-state.interface';

export abstract class TableColumn {
    /** Column unique identifier. */
    abstract name: string;

    /** Column data accessor key. */
    abstract key: string;

    /** Column header label. */
    abstract label: string;

    /** Cell text alignment. */
    abstract align: ColumnAlignValue;

    /** Toggles sort feature in the column header. */
    abstract sortable: boolean;

    /** Toggles filter feature in the column header. */
    abstract filterable: boolean;

    /** Data type the column represents. */
    abstract dataType: FilterableColumnDataType;

    /** Width of the column cells. */
    abstract width: string;

    /** Toggles grouping feature in the column header. */
    abstract groupable: boolean;

    /** Toggles freeze/unfreeze feature in the column header. */
    abstract freezable: boolean;

    /** Toggles end column freeze/unfreeze feature in the column header. */
    abstract endFreezable: boolean;

    /** Initial visibility state of the column. */
    abstract visible: boolean;

    /** Column cell template for readonly mode. */
    abstract columnCellTemplate: TemplateRef<any>;

    /** Column cell template for editing mode. */
    abstract editableColumnCellTemplate: TemplateRef<any>;

    /** Column header template. */
    abstract headerCellTemplate: TemplateRef<any>;

    /** Whether the text should wrap, when text is too long for 1 line. */
    abstract noWrap: boolean;

    /** Whether to apply fd-table-text (text-shadow) to the cell content, if disabled noWrap has no effect. */
    abstract applyText: boolean;

    /** Stores information for the header cell if the ellipsis are visible after the column resize */
    abstract headerOverflows: boolean;

    /** Whether this column is visible */
    abstract responsiveState: FdpColumnResponsiveState;
}

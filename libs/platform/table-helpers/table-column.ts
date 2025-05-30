import { TemplateRef } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { Observable } from 'rxjs';
import { ColumnAlignValue, FilterableColumnDataType } from './enums';
import { FdpColumnResponsiveState } from './interfaces';

export abstract class TableColumn {
    /** Column unique identifier. */
    abstract name: string;

    /** Column data accessor key. */
    abstract key: string;

    /** Column header label. */
    abstract label: string;

    /** Column footer label. */
    abstract footerLabel: string;

    /** Emits when the label value changes. */
    abstract labelValueChanges$: Observable<Nullable<string>>;

    /** Cell text alignment. */
    abstract align: ColumnAlignValue;

    /** Toggles sort feature in the column header. */
    abstract sortable: boolean;

    /** Toggles filter feature in the column header. */
    abstract filterable: boolean;

    /** Data type the column represents. */
    abstract dataType: FilterableColumnDataType;

    /**
     * Optional array of available filter options.
     * Providing values to this input will cause the filter to change from a text-type input to a select-type input.
     * */
    abstract filterSelectOptions: string[];

    /** Width of the column cells. */
    abstract width: string;

    /** Toggles grouping feature in the column header. */
    abstract groupable: boolean;

    /** Toggles freeze/unfreeze feature in the column header. */
    abstract freezable: boolean;

    /** Toggles end column freeze/unfreeze feature in the column header. */
    abstract endFreezable: boolean;

    /**  Whether the table cell inside table header should be non-interactive. */
    abstract nonInteractive: boolean;

    /** Initial visibility state of the column. */
    abstract visible: boolean;

    /** Column cell template for readonly mode. */
    abstract columnCellTemplate: Nullable<TemplateRef<any>>;

    /** Column cell template for editing mode. */
    abstract editableColumnCellTemplate: Nullable<TemplateRef<any>>;

    /** Column header template. */
    abstract headerCellTemplate: Nullable<TemplateRef<any>>;

    /** Column header template. */
    abstract footerCellTemplate: Nullable<TemplateRef<any>>;

    /** Column header popover template. */
    abstract headerCellPopoverTemplate: Nullable<TemplateRef<any>>;

    /** Whether the text should wrap, when text is too long for 1 line. */
    abstract noWrap: boolean;

    /** Whether to apply fd-table-text (text-shadow) to the cell content, if disabled noWrap has no effect. */
    abstract applyText: boolean;

    /** Stores information for the header cell if the ellipsis are visible after the column resize */
    abstract headerOverflows: boolean; // Not being used anywhere, is here for information

    /** Whether this column is visible */
    abstract responsiveState: FdpColumnResponsiveState;
    /** Column role attribute. */
    abstract role: 'cell' | 'rowheader' | 'gridcell';

    /** @hidden */
    abstract _freezed: boolean;

    /** @hidden */
    abstract _endFreezed: boolean;
}

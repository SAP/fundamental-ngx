import { TemplateRef } from '@angular/core';

import { ColumnAlign } from '../../enums/column-align.enum';

export abstract class TableColumn {
    /** Column unique identifier. */
    abstract name: string;

    /** Column data accessor key. */
    abstract key: string;

    /** Column header label. */
    abstract label: string;

    /** Cell text alignment. */
    abstract align: ColumnAlign;

    /** Toggles sort feature in the column header. */
    abstract sortable: boolean;

    /** Toggles filter feature in the column header. */
    abstract filterable: boolean;

    /** Toggles grouping feature in the column header. */
    abstract groupable: boolean;

    /** Toggles freeze/unfreeze feature in the column header. */
    abstract freezable: boolean;

    /** Column cell template */
    abstract columnCellTemplate: TemplateRef<any>;

    /** Column header template */
    abstract headerCellTemplate: TemplateRef<any>;
}

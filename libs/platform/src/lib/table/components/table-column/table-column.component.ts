import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Host,
    Input,
    OnChanges,
    OnInit,
    Optional,
    SimpleChanges,
    TemplateRef
} from '@angular/core';

import { ColumnAlignValue } from '../../enums/column-align.enum';
import { FilterableColumnDataType } from '../../enums/filter-type.enum';
import { FdpCellDef, FdpEditableCellDef } from '../../directives/table-cell.directive';
import { FdpHeaderCellDef } from '../../directives/table-header.directive';
import { FdpColumnResponsiveState } from '../../interfaces/column-responsive-state.interface';

import { TableColumn } from './table-column';
import { TableService } from '../../table.service';
import { TableColumnResizeService } from '../../table-column-resize.service';

/**
 * The component that represents a table column.
 * ```html
 * <fdp-column
 *  name="name"
 *  key="name"
 *  label="Name"
 *  align="start">
 * </fdp-column>
 *
 * <fdp-column
 *  name="price"
 *  key="price.value">
 *  <fdp-table-header *fdpHeaderCellDef>Price</fdp-table-header>
 *  <fdp-table-cell *fdpCellDef="let item">
 *   {{item.price.value}} {{item.price.currency}}
 *  </fdp-table-cell>
 * </fdp-column>
 * ```
 * */
@Component({
    selector: 'fdp-column',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TableColumn, useExisting: TableColumnComponent }]
})
export class TableColumnComponent extends TableColumn implements OnInit, OnChanges {
    /** Column unique identifier. */
    @Input()
    name: string;

    /** Column data accessor. */
    @Input()
    key: string;

    /** Column header label. */
    @Input()
    label: string;

    /** Cell text alignment. */
    @Input() align: ColumnAlignValue = 'start';

    /** Toggles sort feature for the column. */
    @Input()
    sortable = false;

    /** Toggles filter feature for the column. */
    @Input()
    filterable = false;

    /** Initial visibility state of the column. Default `true`. */
    @Input()
    visible = true;

    /**
     * Data type the column represents. Default is 'string'
     * @type { 'string' | 'number' | 'date' | 'boolean' }
     */
    @Input()
    dataType: FilterableColumnDataType = FilterableColumnDataType.STRING;

    /** Toggles grouping feature for the column. */
    @Input()
    groupable = false;

    /** Toggles freeze feature for the column. */
    @Input()
    freezable = false;

    /** Toggles freeze feature for the column. */
    @Input()
    endFreezable = false;

    /** Width of the column cells. */
    @Input()
    set width(value: string) {
        this._width = value;
        this._tableColumnResizeService.setCustomWidth(this.name, value);
    }
    get width(): string {
        return this._width;
    }

    /** Whether the text should wrap, when text is too long for 1 line */
    @Input()
    noWrap = false;

    /** Whether to apply fd-table-text (text-shadow) to the cell content, if disabled noWrap has no effect. */
    @Input()
    applyText = true;

    /** Column cell template */
    columnCellTemplate: TemplateRef<any>;

    /** Editable column cell template. */
    editableColumnCellTemplate: TemplateRef<any>;

    /** Column header template */
    headerCellTemplate: TemplateRef<any>;

    /** Stores information for the header cell if the ellipsis are visible after the column resize */
    headerOverflows = false;

    /** @hidden */
    @ContentChild(FdpCellDef)
    set fdpCellDef(fdpCellDef: FdpCellDef) {
        this.columnCellTemplate = fdpCellDef?.templateRef;
    }

    /** Editable column cell template definition. */
    @ContentChild(FdpEditableCellDef)
    set fdpEditableCellDef(fdpEditableCellDef: FdpEditableCellDef) {
        this.editableColumnCellTemplate = fdpEditableCellDef?.templateRef;
    }

    /** @hidden */
    @ContentChild(FdpHeaderCellDef)
    set fdpHeaderCellDef(fdpHeaderCellDef: FdpHeaderCellDef) {
        this.headerCellTemplate = fdpHeaderCellDef?.templateRef;
    }

    /** Responsive state of the column. */
    responsiveState: FdpColumnResponsiveState = 'visible';

    /** @hidden */
    private _width: string;

    /** @hidden */
    constructor(
        private readonly _tableColumnResizeService: TableColumnResizeService,
        @Optional() @Host() private readonly _tableService?: TableService
    ) {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        this._validateNameOption();
    }

    /** Table won't know about column properties update so notify about it manually
     * @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this._tableService && (changes.sortable || changes.filterable || changes.groupable || changes.freezable)) {
            this._tableService.markForCheck();
        }
    }

    /** @hidden */
    private _validateNameOption(): void {
        if (typeof this.name !== 'string') {
            throw Error('fdp-column: "name" option is required.');
        }
    }
}

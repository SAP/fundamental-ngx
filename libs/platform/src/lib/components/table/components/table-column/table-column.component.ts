import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Host,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    SimpleChanges,
    TemplateRef
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';

import { ColumnAlign, FilterableColumnDataType } from '../../enums';
import { FdpCellDef } from '../../directives/table-cell.directive';
import { FdpHeaderCellDef } from '../../directives/table-header.directive';

import { TableColumn } from './table-column';
import { TableService } from '../../table.service';

enum ColumnAlignEnum {
    Start = 'left',
    Center = 'center',
    End = 'right'
}

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
export class TableColumnComponent extends TableColumn implements OnInit, OnChanges, OnDestroy {
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
    /** @ts-ignore */
    @Input() set align(align: ColumnAlign) {
        let _align = ColumnAlignEnum.Start;

        switch (align) {
            case ColumnAlign.CENTER:
                _align = ColumnAlignEnum.Center;
                break;
            case ColumnAlign.END:
                _align = ColumnAlignEnum.End;
                break;
            case ColumnAlign.START:
                _align = ColumnAlignEnum.Start;
        }

        this._align$.next(_align);
    }

    /** @ts-ignore */
    get align(): string {
        return this._align;
    }

    /** Toggles sort feature for the column. */
    @Input()
    sortable = false;

    /** Toggles filter feature for the column. */
    @Input()
    filterable = false;

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

    /** Width of the column cells. */
    @Input()
    get width(): string {
        return this._width;
    }
    set width(value: string) {
        this._width = value;
        this._tableService?.recalculateColumnsWidth();
    }

    /** Column cell template */
    columnCellTemplate: TemplateRef<any>;

    /** Column header template */
    headerCellTemplate: TemplateRef<any>;

    @ContentChild(FdpCellDef)
    set fdpCellDef(fdpCellDef: FdpCellDef) {
        this.columnCellTemplate = fdpCellDef?.templateRef;
    }

    @ContentChild(FdpHeaderCellDef)
    set fdpHeaderCellDef(fdpHeaderCellDef: FdpHeaderCellDef) {
        this.headerCellTemplate = fdpHeaderCellDef?.templateRef;
    }

    /** @hidden */
    private _align$: BehaviorSubject<ColumnAlignEnum> = new BehaviorSubject<ColumnAlignEnum>(null);

    /** @hidden */
    private _align: ColumnAlignEnum;

    /** @hidden */
    private _destroyed = new Subject<void>();

    /** @hidden */
    private _width: string;

    /** @hidden */
    constructor(
        @Optional() @Host() private readonly _tableService: TableService,
        @Optional() private readonly _rtlService: RtlService
    ) {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        this._validateNameOption();

        this._listenToAlign();
    }

    /** Table won't know about column properties update so notify about it manually
     * @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this._tableService
            && (changes.sortable?.currentValue !== changes.sortable?.previousValue
            || changes.filterable?.currentValue !== changes.filterable?.previousValue
            || changes.groupable?.currentValue !== changes.groupable?.previousValue
            || changes.freezable?.currentValue !== changes.freezable?.previousValue)
        ) {
            this._tableService.markForCheck();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    private _validateNameOption(): void {
        if (typeof this.name !== 'string') {
            throw Error('fdp-column: "name" option is required.');
        }
    }

    /** @hidden */
    private _listenToAlign(): void {
        this._align$
            .asObservable()
            .pipe(
                switchMap((align) =>
                    this._rtlService?.rtl.pipe(
                        map(
                            (isRtl): ColumnAlignEnum => {
                                if (isRtl && align === ColumnAlignEnum.Start) {
                                    return ColumnAlignEnum.End;
                                }

                                if (isRtl && align === ColumnAlignEnum.End) {
                                    return ColumnAlignEnum.Start;
                                }

                                return align;
                            }
                        )
                    )
                ),
                takeUntil(this._destroyed)
            )
            .subscribe((align) => {
                this._align = align;
                this._tableService?.markForCheck();
            });
    }
}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core';

import { ColumnAlign, FilterableColumnDataType } from '../../enums';
import { FdpCellDef, FdpHeaderCellDef } from '../../directives';

import { TableColumn } from './table-column';
import { strict } from 'assert';

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
export class TableColumnComponent extends TableColumn implements OnInit, OnDestroy {
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
    constructor(private readonly _rtlService: RtlService, private readonly _cd: ChangeDetectorRef) {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        this._validateNameOption();

        this._listenToAlign();
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
                    this._rtlService.rtl.pipe(
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
                this._cd.markForCheck();
            });
    }
}

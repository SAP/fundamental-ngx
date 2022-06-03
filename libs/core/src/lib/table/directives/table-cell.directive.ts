import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    ContentChildren,
    forwardRef,
    OnDestroy,
    Optional
} from '@angular/core';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';
import { NumberInput } from '@angular/cdk/coercion';
import { FdTable } from '../fd-table.interface';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]'
})
export class TableCellDirective implements AfterContentInit, OnDestroy {
    /** Whether or not to show the table cell's horizontal borders */
    @HostBinding('class.fd-table__cell--no-horizontal-border')
    @Input()
    noBorderX = false;

    /** Whether or not to show the table cell's vertical borders */
    @HostBinding('class.fd-table__cell--no-vertical-border')
    @Input()
    noBorderY = false;

    /** Whether or not the table cell is activable */
    @HostBinding('class.fd-table__cell--activable')
    @Input()
    activable = false;

    /** Whether or not the table cell is focusable */
    @HostBinding('class.fd-table__cell--focusable')
    @Input()
    set focusable(value: Nullable<boolean>) {
        this._focusable = value;
    }

    get focusable(): Nullable<boolean> {
        return this._focusable ?? this._table?.allCellsFocusable;
    }

    /** @hidden */
    private _focusable: Nullable<boolean>;

    /** Tabindex attribute for the cell */
    @HostBinding('attr.tabindex')
    @Input()
    set tabindex(value: Nullable<NumberInput>) {
        this._tabindex = value;
    }

    get tabindex(): Nullable<NumberInput> {
        return this._tabindex ?? (this.focusable ? 0 : null);
    }

    /** @hidden */
    private _tabindex: Nullable<NumberInput>;

    /** Whether or not the table cell is hoverable */
    @HostBinding('class.fd-table__cell--hoverable')
    @Input()
    hoverable = false;

    /** Whether or not the table cell's width should fit to content  */
    @HostBinding('class.fd-table__cell--fit-content')
    @Input()
    fitContent = false;

    /** Whether or not the table cell shouldn't have padding on sides */
    @HostBinding('class.fd-table__cell--no-padding')
    @Input()
    noPadding = false;

    /** Whether or not the table cell indicates that there is no data */
    @HostBinding('class.fd-table__cell--no-data')
    @Input()
    noData = false;

    /** Key of cell element, it's used to identify this cell with certain column */
    @Input()
    key: string;

    /** Function, that creates a string to be announced by screenreader whenever cell receives focus */
    @Input()
    cellFocusedEventAnnouncer: (data: TableCellPosition) => string = this._defaultCellFocusedEventAnnouncer;

    /** @hidden */
    @ContentChildren(forwardRef(() => CheckboxComponent))
    _checkboxes: QueryList<CheckboxComponent>;

    /** @hidden */
    @HostBinding('class.fd-table__cell')
    _fdTableCellClass = true;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private readonly _liveAnnouncer: LiveAnnouncer,
        @Optional() private readonly _table?: FdTable
    ) {}

    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        const cell = this.elementRef.nativeElement;

        if (this._checkboxes && this._checkboxes.length) {
            cell.classList.add('fd-table__cell--checkbox');
        }

        if (this.noData) {
            cell.setAttribute('colspan', '100%');
        }

        fromEvent(cell, 'focusin')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => {
                const data = this.getCellPosition();

                if (!data) {
                    return;
                }

                this._liveAnnouncer.clear();
                this._liveAnnouncer.announce(this.cellFocusedEventAnnouncer(data));
            });

        fromEvent<KeyboardEvent>(cell, 'keydown')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((event) => this._table?._onCellKeydown(event, this));
    }

    /** Returns row and col indexes for the cell */
    getCellPosition(): TableCellPosition | undefined {
        const parentRow = this.elementRef.nativeElement.parentElement;
        if (!(parentRow instanceof HTMLTableRowElement)) {
            return;
        }
        const section = parentRow.parentElement;
        if (!(section instanceof HTMLTableSectionElement)) {
            return;
        }
        const rows = section.children;
        const cols = parentRow.children;

        const row = [...(rows as any as Element[])].indexOf(parentRow);
        const col = [...(cols as any as Element[])].indexOf(this.elementRef.nativeElement);
        return {
            row,
            col,
            totalRows: rows.length,
            totalCols: cols.length,
            origin: section
        };
    }

    /** @hidden */
    private _defaultCellFocusedEventAnnouncer(data: TableCellPosition): string {
        return `Column ${data.col + 1} of ${data.totalCols}, row: ${data.row + 1} of ${data.totalRows}`;
    }
}

export interface TableCellPosition {
    row: number;
    col: number;
    totalRows: number;
    totalCols: number;
    origin: HTMLTableSectionElement;
}

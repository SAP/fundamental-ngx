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
    Optional,
    HostListener
} from '@angular/core';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { DestroyedService, TabbableElementService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import { NumberInput } from '@angular/cdk/coercion';
import { FdTable } from '../fd-table.interface';

export interface TableCellPosition {
    row: number;
    col: number;
    totalRows: number;
    totalCols: number;
    origin: HTMLTableSectionElement;
}

@Directive({
    selector: '[fdTableCell], [fd-table-cell]',
    providers: [DestroyedService, TabbableElementService]
})
export class TableCellDirective implements AfterContentInit {
    /** Whether to show the table cell's horizontal borders */
    @HostBinding('class.fd-table__cell--no-horizontal-border')
    @Input()
    noBorderX = false;

    /** Whether to show the table cell's vertical borders */
    @HostBinding('class.fd-table__cell--no-vertical-border')
    @Input()
    noBorderY = false;

    /** Whether the table cell is activable */
    @HostBinding('class.fd-table__cell--activable')
    @Input()
    activable = false;

    /** Whether the table cell is focusable */
    @HostBinding('class.fd-table__cell--focusable')
    @Input()
    set focusable(value: Nullable<boolean>) {
        this._focusable = value;
    }

    get focusable(): Nullable<boolean> {
        return this._focusable ?? this._table?.allCellsFocusable;
    }

    /** Tabindex attribute for the cell */
    @Input()
    set tabindex(value: Nullable<NumberInput>) {
        this._tabindex = value;
    }

    get tabindex(): Nullable<NumberInput> {
        return this._tabindex ?? (this.focusable ? 0 : null);
    }

    /** Whether the table cell is hoverable */
    @HostBinding('class.fd-table__cell--hoverable')
    @Input()
    hoverable = false;

    /** Whether the table cell's width should fit to content  */
    @HostBinding('class.fd-table__cell--fit-content')
    @Input()
    fitContent = false;

    /** Whether the table cell shouldn't have padding on sides */
    @HostBinding('class.fd-table__cell--no-padding')
    @Input()
    noPadding = false;

    /** Whether the table cell indicates that there is no data */
    @HostBinding('class.fd-table__cell--no-data')
    @Input()
    noData = false;

    /** Key of cell element, it's used to identify this cell with certain column */
    @Input()
    key: string;

    /** Function, that creates a string to be announced by screen-reader whenever cell receives focus */
    @Input()
    cellFocusedEventAnnouncer: (data: TableCellPosition) => string = this._defaultCellFocusedEventAnnouncer;

    /** @hidden */
    @ContentChildren(forwardRef(() => CheckboxComponent))
    _checkboxes: QueryList<CheckboxComponent>;

    /** @hidden */
    @HostBinding('class.fd-table__cell')
    _fdTableCellClass = true;

    /** @hidden */
    private _tabbableElements = new Map<HTMLElement, number>();

    /** @hidden */
    private _focusable: Nullable<boolean>;

    /** @hidden */
    private _tabindex: Nullable<NumberInput>;

    /** @hidden */
    private _canBeFocused = true;

    /** @hidden */
    @HostBinding('attr.tabindex')
    private get _cellTabIndex(): Nullable<NumberInput> {
        return this._canBeFocused ? this.tabindex : -1;
    }

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private readonly _liveAnnouncer: LiveAnnouncer,
        private readonly _onDestroy$: DestroyedService,
        private readonly _tabbableElementService: TabbableElementService,
        @Optional() private readonly _table?: FdTable
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        const cell = this.elementRef.nativeElement;

        if (this._checkboxes && this._checkboxes.length) {
            cell.classList.add('fd-table__cell--checkbox');
        }

        if (this.noData) {
            cell.setAttribute('colspan', '100%');
        }
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

    /**
     * Toggles focusable state of the cell.
     * @param canFocus When `false`, disables any tabbable element inside cell.
     */
    toggleFocusableState(canFocus: boolean): void {
        this._canBeFocused = canFocus;

        if (!canFocus) {
            this._disableTabbableElements();
        } else {
            this._enableTabbableElements();
        }
    }

    /** @hidden */
    private _disableTabbableElements(): void {
        // Since we cannot select by tabindex attribute (links, inputs, buttons might not have one but still can be focusable),
        // Select all elements from the cell and filter by tabIndex property.
        Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>('*'))
            .filter((elm) => elm.tabIndex >= 0)
            .forEach((elm) => {
                this._tabbableElements.set(elm, elm.tabIndex);
                elm.tabIndex = -1;
            });
    }

    /** @hidden */
    private _enableTabbableElements(): void {
        // If there's no elements in map, skip action.
        if (this._tabbableElements.size === 0) {
            return;
        }
        this._tabbableElements.forEach((tabIndex, element) => {
            element.tabIndex = tabIndex;
        });
        this._canBeFocused = false;
    }

    /** @hidden */
    @HostListener('focus')
    private _onFocus(): void {
        this._table?._setCurrentFocusableCell(this);
        this._enableTabbableElements();

        const tabbableElement = this._tabbableElementService.getTabbableElement(
            this.elementRef.nativeElement,
            false,
            true
        );

        tabbableElement?.focus();
    }

    /** @hidden */
    @HostListener('focusin')
    private async _onFocusIn(): Promise<void> {
        const data = this.getCellPosition();

        if (!data) {
            return;
        }

        this._liveAnnouncer.clear();
        await this._liveAnnouncer.announce(this.cellFocusedEventAnnouncer(data));
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    private _onKeyDown(event: KeyboardEvent): void {
        this._table?._onCellKeydown(event, this);
    }

    /** @hidden */
    private _defaultCellFocusedEventAnnouncer(data: TableCellPosition): string {
        return `Column ${data.col + 1} of ${data.totalCols}, row: ${data.row + 1} of ${data.totalRows}`;
    }
}

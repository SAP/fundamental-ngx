import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { KeyUtil, TabbableElementService } from '@fundamental-ngx/cdk/utils';
import { Subscription } from 'rxjs';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableRowDirective } from './directives/table-row.directive';
import { FdTable } from './fd-table.interface';
import { TableService } from './table.service';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

// Since we are searching for focusable cell not by the component but by the element, we need to filter items by classname.
export const FOCUSABLE_CELL_CLASSNAME = 'fd-table__cell--focusable';
export const FOCUSABLE_ROW_CLASSNAME = 'fd-table__row--focusable';

export const FdTableContentDensityProviderParams = {
    modifiers: {
        [ContentDensityMode.COMPACT]: 'fd-table--compact',
        [ContentDensityMode.CONDENSED]: 'fd-table--condensed'
    },
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.CONDENSED, ContentDensityMode.COZY]
};

/**
 * The component that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 * <table fd-table></table>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'table[fd-table]',
    exportAs: 'fd-table',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TableService,
        TabbableElementService,
        { provide: FdTable, useExisting: forwardRef(() => TableComponent) },
        contentDensityObserverProviders(FdTableContentDensityProviderParams)
    ]
})
export class TableComponent implements AfterViewInit, OnDestroy, FdTable {
    /** @hidden */
    @HostBinding('class.fd-table')
    fdTableClass = true;

    /** Whether or not to show the table's horizontal borders */
    @HostBinding('class.fd-table--no-horizontal-borders')
    @Input()
    noBorderX = false;

    /** Whether or not to show the table's vertical borders */
    @HostBinding('class.fd-table--no-vertical-borders')
    @Input()
    noBorderY = false;

    /** Whether or not to display the table in pop in mode, it also require change of markup */
    @HostBinding('class.fd-table--pop-in')
    @Input()
    popIn = false;

    /** Whether or not to display the table in responsive mode. */
    @HostBinding('class.fd-table--responsive')
    @Input()
    responsive = false;

    /** List of keys that identifies single columns */
    @Input()
    keys: string[];

    /** Applies `focusable` to all cells within this table */
    @Input()
    allCellsFocusable = false;

    /** @hidden */
    @ContentChildren(TableCellDirective, { descendants: true })
    private _cells: QueryList<TableCellDirective>;

    /** @hidden */
    @ContentChildren(TableRowDirective, { descendants: true })
    private _rows: QueryList<TableRowDirective>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private readonly _tableService: TableService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _tabbableElementService: TabbableElementService
    ) {
        this._contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._propagateKeys(this.keys);
    }

    /** Method that sorts and changes visible state of particular cells  */
    reset(keys: string[]): void {
        this._propagateKeys(keys);
    }

    /** @hidden */
    _onRowKeydown(event: KeyboardEvent, tableRow: TableRowDirective): void {
        if (!event.defaultPrevented && KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW]) && !event.altKey) {
            const dir = KeyUtil.isKeyCode(event, DOWN_ARROW) ? 1 : -1;
            const rows = dir === 1 ? this._rows.toArray() : this._rows.toArray().reverse();
            const currentRowIndex = rows.findIndex((row) => row === tableRow);

            const nextFocusableRow = rows.find((row, index) => index > currentRowIndex && row.focusable);

            if (nextFocusableRow) {
                this._setCurrentFocusableRow(nextFocusableRow);
                // Need a delay for tabindex attributes to set.
                setTimeout(() => {
                    nextFocusableRow.elementRef.nativeElement.focus();
                }, 0);
                return;
            }

            const parentElm = tableRow.elementRef.nativeElement.parentElement;
            const sectionElement = dir === 1 ? parentElm?.nextElementSibling : parentElm?.previousElementSibling;
            const childrenLength = (sectionElement?.children.length ?? 0) - 1;
            const nextIndex = dir === 1 ? currentRowIndex + dir : childrenLength;

            // If no focusable rows found, try to focus focusable cell instead
            this._focusCellInTableSection(sectionElement, nextIndex, 0, true);
        }
    }

    /** @hidden being triggered by TableCellDirective whenever it's clicked */
    _onCellKeydown(event: KeyboardEvent, cell: TableCellDirective): void {
        const cellElement = cell.elementRef.nativeElement;
        if (!event.defaultPrevented && KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW]) && !event.altKey) {
            event.preventDefault();
            const data = cell.getCellPosition();
            if (!data) {
                return;
            }
            event.preventDefault();
            const dir = KeyUtil.isKeyCode(event, DOWN_ARROW) ? 1 : -1;
            // if navigating up&down through the rows, attempt to focus the cell in the next row within the same section (e.g. within body)
            const focused = this._focusCellInTableSection(data?.origin, data.row + dir, data?.col);
            if (!focused) {
                // if cannot find the next row, attempt to jump to another section (e.g. to the header or footer, depending on the direction)
                if (dir === 1) {
                    this._focusCellInTableSection(data.origin.nextElementSibling, 0, data.col);
                } else {
                    const prev = data.origin.previousElementSibling;
                    prev && this._focusCellInTableSection(prev, prev.children.length - 1, data.col);
                }
            }
        } else if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            const prev = cellElement.previousElementSibling;
            prev instanceof HTMLTableCellElement && prev.focus();
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            const next = cellElement.nextElementSibling;
            next instanceof HTMLTableCellElement && next.focus();
        }
    }

    /** @hidden */
    _setCurrentFocusableCell(cell: TableCellDirective): void {
        this._cells?.forEach((tableCell) => {
            tableCell.toggleFocusableState(tableCell === cell);
        });
        this._cdr.detectChanges();
    }

    /** @hidden */
    _setCurrentFocusableRow(row: TableRowDirective): void {
        this._rows?.forEach((tableRow) => {
            tableRow.toggleFocusableState(tableRow === row);
        });
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _focusCellInTableSection(
        tableSectionElement: Nullable<Element>,
        row: number,
        col: number,
        reverse = false
    ): boolean {
        const targetRow = tableSectionElement?.children.item(row);
        const rowChildren = targetRow?.children;
        const targetCell = reverse ? rowChildren?.item(rowChildren?.length - 1 - col) : rowChildren?.item(col);
        if (targetCell instanceof HTMLTableCellElement && targetCell.classList.contains(FOCUSABLE_CELL_CLASSNAME)) {
            targetCell.focus();
            return true;
        } else if (targetRow instanceof HTMLTableRowElement && targetRow.classList.contains(FOCUSABLE_ROW_CLASSNAME)) {
            targetRow.focus();
            return true;
        }

        // if we couldn't find the next cell, but the actual row exists, still treat the operation as success
        return !!targetRow;
    }

    /** @hidden */
    private _propagateKeys(keys: string[]): void {
        if (keys) {
            this._tableService.changeKeys([...keys]);
        }
    }
}

import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { ContentDensityService, KeyUtil } from '@fundamental-ngx/core/utils';
import { Subscription } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';
import { TableCellDirective } from './directives/table-cell.directive';
import { FdTable } from './fd-table.interface';

import { TableService } from './table.service';

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
    providers: [TableService, { provide: FdTable, useExisting: TableComponent }]
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy, FdTable {
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

    /** Whether or not to display the table in compact mode */
    @HostBinding('class.fd-table--compact')
    @Input()
    compact?: boolean;

    /** Whether or not to display the table in condensed mode */
    @HostBinding('class.fd-table--condensed')
    @Input()
    condensed?: boolean;

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
    private _subscriptions = new Subscription();

    constructor(
        private _tableService: TableService,
        private _cdr: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this.condensed === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    this.compact = density === 'compact';
                    this.condensed = density === 'condensed';
                    this._cdr.detectChanges();
                })
            );
        }
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
    private _propagateKeys(keys: string[]): void {
        if (keys) {
            this._tableService.changeKeys([...keys]);
        }
    }

    /** @hidden being triggered by TableCellDirective whenever it's clicked */
    _onCellKeydown(event: KeyboardEvent, cell: TableCellDirective): void {
        const cellElement = cell.elementRef.nativeElement;
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            const data = cell.getCellPosition();
            if (!data) {
                return;
            }
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
    private _focusCellInTableSection(tableSectionElement: Nullable<Element>, row: number, col: number): boolean {
        const targetRow = tableSectionElement?.children.item(row);
        const targetCell = targetRow?.children.item(col);
        if (targetCell instanceof HTMLTableCellElement) {
            targetCell.focus();
            return true;
        } else {
            // if couldn't find the next cell, but the actual row exists, still treat the operation as success
            return !!targetRow;
        }
    }
}

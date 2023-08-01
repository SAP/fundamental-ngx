import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    HostBinding,
    inject,
    Input,
    OnDestroy,
    OnInit,
    QueryList
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { TableService } from '../table.service';
import { TableCellDirective } from './table-cell.directive';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FDK_FOCUSABLE_LIST_DIRECTIVE, FocusableListDirective } from '@fundamental-ngx/cdk/utils';

export const HIDDEN_CLASS_NAME = 'fd-table--hidden';

@Directive({
    selector: '[fdTableRow], [fd-table-row]',
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: TableRowDirective
        }
    ]
})
export class TableRowDirective extends FocusableListDirective implements AfterViewInit, OnDestroy, OnInit {
    /** @hidden */
    @ContentChildren(TableCellDirective)
    cells: QueryList<TableCellDirective>;

    /** @hidden */
    @HostBinding('class.fd-table__row')
    fdTableRowClass = true;

    /** Whether the table row is activable */
    @HostBinding('class.fd-table__row--activable')
    @Input()
    activable = false;

    /** Whether the table row is hoverable */
    /** Whether to highlight active row when clicked. */
    @Input()
    highlightActive = false;

    /**  Whether the table row is hoverable */
    @HostBinding('class.fd-table__row--hoverable')
    @Input()
    hoverable = false;

    /** Whether the table row is focusable */
    @HostBinding('class.fd-table__row--focusable')
    @Input()
    set focusable(value: BooleanInput) {
        this._focusable = coerceBooleanProperty(value);

        this.setTabbable(this._focusable);
    }
    get focusable(): boolean {
        return this._focusable;
    }

    /** Whether the table row is main row, it's concerned only on pop in mode */
    @HostBinding('class.fd-table__row--main')
    @Input()
    main = false;

    /** Whether the table row is secondary row, it's concerned only on pop in mode */
    @HostBinding('class.fd-table__row--secondary')
    @Input()
    secondary = false;

    /** Whether the table row is active. */
    @HostBinding('class.is-selected')
    @Input()
    active = false;

    /** @hidden */
    elementRef: ElementRef<HTMLTableRowElement> = inject(ElementRef);

    /** @hidden */
    private _propagateKeysSubscription: Subscription;
    /** @hidden */
    private readonly _changeDetRef = inject(ChangeDetectorRef);
    /** @hidden */
    private _tableService = inject(TableService);

    /** @hidden */
    ngOnInit(): void {
        this.navigationDirection = 'grid';
        this._updateNavigationDirection();
        this._propagateKeysSubscription = this._tableService.propagateKeys$.subscribe((keys: string[]) =>
            this._resetCells(keys)
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this._resetCells(this._tableService.propagateKeys$.getValue());
        this._setupCellsSubscription();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._propagateKeysSubscription.unsubscribe();
    }

    /** @hidden */
    private _resetCells(keys: string[]): void {
        if (this.cells && keys && keys.length > 0) {
            this._changeVisibility(keys);

            const sortedCells = this.cells.toArray().sort((a, b) => this._sortMethod(a, b, keys));

            this.cells.reset(sortedCells);

            this._sortNativeElements();

            this._changeDetRef.detectChanges();
        }
    }

    /** @hidden */
    private _sortMethod(a: TableCellDirective, b: TableCellDirective, keys: string[]): number {
        if (keys.findIndex((_key) => _key === a.key) < keys.findIndex((_key) => _key === b.key)) {
            return -1;
        } else {
            return 1;
        }
    }

    /** @hidden */
    private _sortNativeElements(): void {
        this.cells.forEach((cell) =>
            cell.elementRef.nativeElement.parentNode?.appendChild(cell.elementRef.nativeElement)
        );
    }

    /** @hidden */
    private _changeVisibility(keys: string[]): void {
        this.cells.forEach((cell) => cell.elementRef.nativeElement.classList.remove(HIDDEN_CLASS_NAME));
        const notFoundElements: TableCellDirective[] = this.cells.filter(
            (cell) => !keys.find((key) => key === cell.key)
        );
        notFoundElements.forEach(this._hideElement);
    }

    /** @hidden */
    private _hideElement(element: TableCellDirective): void {
        element.elementRef.nativeElement.classList.add(HIDDEN_CLASS_NAME);
    }

    /** @hidden */
    private _setupCellsSubscription(): void {
        this.cells.changes.pipe(startWith(null)).subscribe(() => {
            this.cells.forEach((cell, index) => {
                cell.elementRef.nativeElement.ariaColIndex = index.toString();
            });
        });
    }
}

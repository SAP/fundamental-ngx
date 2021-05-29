import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    QueryList
} from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
import { TableService } from '../table.service';
import { Subscription } from 'rxjs';
import { KeyUtil } from '../../utils/functions';
import { ENTER, SPACE, TAB } from '@angular/cdk/keycodes';

export const HIDDEN_CLASS_NAME = 'fd-table-hidden';


@Directive({
    selector: '[fdTableRow], [fd-table-row]'
})
export class TableRowDirective implements AfterViewInit, OnDestroy, OnInit {

    /** @hidden */
    @ContentChildren(TableCellDirective)
    cells: QueryList<TableCellDirective>;

    /** @hidden */
    @HostBinding('class.fd-table__row')
    fdTableRowClass = true;

    /** Whether or not the table row is activable */
    @HostBinding('class.fd-table__row--activable')
    @Input()
    activable = false;

    /** Whether or not the table row is hoverable */
    @HostBinding('class.fd-table__row--hoverable')
    @Input()
    hoverable = false;

    /** Whether or not the table row is focusable */
    @HostBinding('class.fd-table__row--focusable')
    @Input()
    focusable = false;

    /** Whether or not the table row is main row, it's concerned only on pop in mode */
    @HostBinding('class.fd-table__row--main')
    @Input()
    main = false;

    /** Whether or not the table row is secondary row, it's concerned only on pop in mode */
    @HostBinding('class.fd-table__row--secondary')
    @Input()
    secondary = false;

    /** Whether or not the table row is navigatable */
    @Input()
    set navigatable(val: boolean) {
        this._navigatable = val;
        this._changeDetRef.detectChanges();
    }
    get navigatable(): boolean {
        return this._navigatable;
    }

    /** @hidden */
    private _navigatable = true;

    @HostBinding('class.fd-table__row--unnavigatable') 
    get unnavigatable(): boolean { return !this.navigatable; }

    /** @hidden */
    propagateKeysSubscription: Subscription;

    /** When the row is unnavigable, prevent interaction via enter and space keys */
    @HostListener('keydown', ['$event']) handleKeyDown(event: KeyboardEvent): void {
        if (!this._navigatable && KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            event.preventDefault();
        }
    }

    constructor(
        private _changeDetRef: ChangeDetectorRef,
        private _tableService: TableService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.propagateKeysSubscription = this._tableService.propagateKeys$.subscribe(
            (keys: string[]) => this._resetCells(keys)
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._resetCells(this._tableService.propagateKeys$.getValue());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.propagateKeysSubscription.unsubscribe();
    }

    /** @hidden */
    private _resetCells(keys: string[]): void {
        if (this.cells && keys && keys.length > 0) {

            this._changeVisibility(keys);

            const sortedCells = this.cells.toArray().sort(((a, b) => this._sortMethod(a, b, keys)));

            this.cells.reset(sortedCells);

            this._sortNativeElements();

            this._changeDetRef.detectChanges();
        }
    }

    /** @hidden */
    private _sortMethod(a: TableCellDirective, b: TableCellDirective, keys: string[]): number {
        if (keys.findIndex(_key => _key === a.key) <
            keys.findIndex(_key => _key === b.key)) {
            return -1;
        } else {
            return 1;
        }
    }

    /** @hidden */
    private _sortNativeElements(): void {
        this.cells.forEach(cell =>
            cell.elementRef.nativeElement.parentNode.appendChild(cell.elementRef.nativeElement)
        );
    }

    /** @hidden */
    private _changeVisibility(keys: string[]): void {
        this.cells.forEach(cell => cell.elementRef.nativeElement.classList.remove(HIDDEN_CLASS_NAME));
        const notFoundElements: TableCellDirective[] = this.cells.filter(cell => !keys.find(key => key === cell.key));
        notFoundElements.forEach(this._hideElement);
    }

    /** @hidden */
    private _hideElement(element: TableCellDirective): void {
        element.elementRef.nativeElement.classList.add(HIDDEN_CLASS_NAME)
    }
}

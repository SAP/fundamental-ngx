import { AfterViewInit, ChangeDetectorRef, ContentChildren, Directive, HostBinding, Input, QueryList } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
import { TableService } from '../table.service';

export const Hidden_Class_Name = 'fd-table-hidden';


@Directive({
    selector: '[fdTableRow], [fd-table-row]'
})
export class TableRowDirective implements AfterViewInit {

    @ContentChildren(TableCellDirective)
    cells: QueryList<TableCellDirective>;

    /** @hidden */
    @HostBinding('class.fd-table__row')
    fdTableRowClass: boolean = true;

    /** Whether or not the table row is activable */
    @HostBinding('class.fd-table__row--activable')
    @Input()
    activable: boolean = false;

    /** Whether or not the table row is hoverable */
    @HostBinding('class.fd-table__row--hoverable')
    @Input()
    hoverable: boolean = false;

    /** Whether or not the table row is main row, it's concerned only on pop in mode */
    @HostBinding('class.fd-table__row--main')
    @Input()
    main: boolean = false;

    /** Whether or not the table row is secondary row, it's concerned only on pop in mode */
    @HostBinding('class.fd-table__row--secondary')
    @Input()
    secondary: boolean = false;

    constructor(
        private _changeDetRef: ChangeDetectorRef,
        private _tableService: TableService
    ) {
        this._tableService.propagateKeys$.subscribe((keys: string[]) => this._sortCells(keys));
    }

    ngAfterViewInit(): void {
        this._sortCells(this._tableService.propagateKeys$.getValue());
    }

    private _sortCells(keys: string[]): void {
        if (this.cells && keys && keys.length > 0) {

            this._handleElements(keys);

            const newCells = this.cells.toArray().sort(((a, b) => this._sortMethod(a, b, keys)));

            this.cells.reset(newCells);
            this._sortNativeElements();
            this._changeDetRef.detectChanges();
        }
    }

    private _sortMethod(a: TableCellDirective, b: TableCellDirective, keys: string[]): number {
        if (keys.findIndex(_key => _key === a.key) <
            keys.findIndex(_key => _key === b.key)) {
            return -1;
        } else {
            return 1;
        }
    }

    private _sortNativeElements(): void {
        this.cells
            .forEach(cell =>
                cell.elementRef.nativeElement.parentNode.appendChild(cell.elementRef.nativeElement)
            )
        ;
    }

    private _handleElements(keys: string[]): void {
        this.cells.forEach(cell => cell.elementRef.nativeElement.classList.remove(Hidden_Class_Name))
        const notFoundElements: TableCellDirective[] = this.cells.filter(cell => !keys.find(key => key === cell.key));
        notFoundElements.forEach(element => this._removeElement(element.elementRef.nativeElement));
    }

    private _removeElement(nativeElement: any): void {
        nativeElement.classList.add(Hidden_Class_Name);
    }
}

import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectorRef,
    contentChildren,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    OnInit
} from '@angular/core';

import { FDK_FOCUSABLE_LIST_DIRECTIVE, FocusableListDirective } from '@fundamental-ngx/cdk/utils';
import { TableService } from '../table.service';
import { TableCellDirective } from './table-cell.directive';

export const HIDDEN_CLASS_NAME = 'fd-table--hidden';

@Directive({
    selector: '[fdTableRow], [fd-table-row]',
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: TableRowDirective
        }
    ],
    host: {
        class: 'fd-table__row',
        '[class.fd-table__row--activable]': 'activable()',
        '[class.fd-table__row--hoverable]': 'hoverable()',
        '[class.fd-table__row--main]': 'main()',
        '[class.fd-table__row--secondary]': 'secondary()',
        '[class.fd-table__row--focusable]': 'focusable',
        '[class.is-selected]': 'active()',
        '[attr.role]': 'role()'
    }
})
export class TableRowDirective extends FocusableListDirective implements OnInit, AfterViewInit {
    /** ARIA role for the table row */
    readonly role = input('row');

    /** @hidden */
    readonly cells = contentChildren(TableCellDirective);

    /** Whether the table row is activable */
    readonly activable = input(false, { transform: booleanAttribute });

    /** Whether the table row is hoverable */
    /** Whether to highlight active row when clicked. */
    readonly highlightActive = input(false, { transform: booleanAttribute });

    /**  Whether the table row is hoverable */
    readonly hoverable = input(false, { transform: booleanAttribute });

    /** Whether the table row is main row, it's concerned only on pop in mode */
    readonly main = input(false, { transform: booleanAttribute });

    /** Whether the table row is secondary row, it's concerned only on pop in mode */
    readonly secondary = input(false, { transform: booleanAttribute });

    /** Whether the table row is active. */
    readonly active = input(false, { transform: booleanAttribute });

    /** @hidden */
    elementRef: ElementRef<HTMLTableRowElement> = inject(ElementRef);

    /** @hidden */
    private readonly _changeDetRef = inject(ChangeDetectorRef);

    /** @hidden */
    private _tableService = inject(TableService);

    /** @hidden */
    constructor() {
        super();

        effect(() => {
            this._resetCells(this._tableService.propagateKeys$());
        });

        // Set aria-colindex on cells when they change (1-based index)
        // This effect runs in constructor (injection context) but reads cells signal which updates after content init
        effect(() => {
            this.cells().forEach((cell, index) => {
                cell.elementRef.nativeElement.ariaColIndex = (index + 1).toString();
            });
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this.navigationDirection.set('grid');
        this._updateNavigationDirection();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this._resetCells(this._tableService.propagateKeys$());
    }

    /** @hidden */
    private _resetCells(keys: string[]): void {
        const cells = this.cells();
        if (cells.length > 0 && keys && keys.length > 0) {
            this._changeVisibility(keys);

            const sortedCells = [...cells].sort((a, b) => this._sortMethod(a, b, keys));

            this._sortNativeElements(sortedCells);

            this._changeDetRef.detectChanges();
        }
    }

    /** @hidden */
    private _sortMethod(a: TableCellDirective, b: TableCellDirective, keys: string[]): number {
        if (keys.findIndex((_key) => _key === a.key()) < keys.findIndex((_key) => _key === b.key())) {
            return -1;
        } else {
            return 1;
        }
    }

    /** @hidden */
    private _sortNativeElements(sortedCells: readonly TableCellDirective[]): void {
        sortedCells.forEach((cell) =>
            cell.elementRef.nativeElement.parentNode?.appendChild(cell.elementRef.nativeElement)
        );
    }

    /** @hidden */
    private _changeVisibility(keys: string[]): void {
        const cells = this.cells();
        cells.forEach((cell) => cell.elementRef.nativeElement.classList.remove(HIDDEN_CLASS_NAME));
        const notFoundElements: TableCellDirective[] = cells.filter((cell) => !keys.find((key) => key === cell.key()));
        notFoundElements.forEach(this._hideElement);
    }

    /** @hidden */
    private _hideElement(element: TableCellDirective): void {
        element.elementRef.nativeElement.classList.add(HIDDEN_CLASS_NAME);
    }
}

import {
    AfterContentInit,
    ContentChildren,
    Directive,
    HostBinding,
    HostListener,
    Input,
    QueryList,
    booleanAttribute
} from '@angular/core';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent, FD_CHECKBOX_COMPONENT } from '@fundamental-ngx/core/checkbox';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]',
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: TableCellDirective
        }
    ],
    standalone: true
})
export class TableCellDirective extends FocusableItemDirective implements AfterContentInit {
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

    /** @hidden */
    @HostBinding('class.fd-table__cell--focusable')
    @Input({ transform: booleanAttribute })
    set focusable(value: boolean) {
        this.setFocusable(value);
    }
    get focusable(): boolean {
        return this.isFocusable();
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

    /** Whether the table cell inside table header should be non-interactive */
    @HostBinding('class.fd-table__cell--non-interactive')
    @Input()
    nonInteractive = false;

    /** Key of a cell element, it's used to identify this cell with certain column */
    @Input()
    key: string;

    /** @hidden */
    @ContentChildren(FD_CHECKBOX_COMPONENT)
    _checkboxes: QueryList<CheckboxComponent>;

    /** @hidden */
    @HostBinding('class.fd-table__cell')
    _fdTableCellClass = true;

    /** @hidden */
    private _parentPreviousTabIndex: number | undefined;

    /** @hidden */
    constructor() {
        super();
        this.setFocusable(false);
    }

    /** @hidden */
    @HostListener('focusin')
    protected _focusIn(): void {
        const parentEl = this.elementRef.nativeElement.parentElement;
        this._parentPreviousTabIndex = parentEl?.tabIndex;
        parentEl?.removeAttribute('tabindex');
    }

    /** @hidden */
    @HostListener('focusout')
    protected _focusOut(): void {
        const parentEl = this.elementRef.nativeElement.parentElement;
        if (this._parentPreviousTabIndex) {
            parentEl?.setAttribute('tabindex', this._parentPreviousTabIndex.toString());
        }
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
    }
}

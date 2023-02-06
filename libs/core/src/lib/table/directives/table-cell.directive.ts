import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    ContentChildren,
    forwardRef,
    inject,
    Output,
    EventEmitter
} from '@angular/core';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { CellFocusedEventAnnouncer, FocusableItemDirective, FocusableItemPosition } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]',
    hostDirectives: [FocusableItemDirective]
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
        this._focusableItemDirective.focusChild = value;
        this._focusableItemDirective.fdkFocusableItem = value;
    }

    get focusable(): Nullable<boolean> {
        return this._focusableItemDirective.fdkFocusableItem;
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
    set cellFocusedEventAnnouncer(announcer: CellFocusedEventAnnouncer) {
        this._focusableItemDirective.cellFocusedEventAnnouncer = announcer;
    }

    /** Event emitted when the cell receives focus, not being emitted when focus moves between item's children. */
    @Output()
    get cellFocused(): EventEmitter<FocusableItemPosition> {
        return this._focusableItemDirective.cellFocused;
    }

    /** @hidden */
    @ContentChildren(forwardRef(() => CheckboxComponent))
    _checkboxes: QueryList<CheckboxComponent>;

    /** @hidden */
    @HostBinding('class.fd-table__cell')
    _fdTableCellClass = true;

    /** @hidden */
    public readonly _focusableItemDirective = inject(FocusableItemDirective);

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {
        this.focusable = false;
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

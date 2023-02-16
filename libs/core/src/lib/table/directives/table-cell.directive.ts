import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    ContentChildren,
    forwardRef,
    inject
} from '@angular/core';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { CellFocusedEventAnnouncer, FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { BooleanInput } from '@angular/cdk/coercion';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]',
    hostDirectives: [
        {
            directive: FocusableItemDirective,
            // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property
            outputs: ['cellFocused']
        }
    ]
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

    /** @hidden */
    @HostBinding('class.fd-table__cell--focusable')
    @Input()
    set focusable(value: BooleanInput) {
        this._focusableItemDirective.fdkFocusableItem = value;
    }
    get focusable(): boolean {
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
        this._focusableItemDirective.fdkFocusableItem = false;
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

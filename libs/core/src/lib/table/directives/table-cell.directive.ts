import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    ContentChildren,
    forwardRef
} from '@angular/core';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]'
})
export class TableCellDirective implements AfterContentInit {
    /** Whether or not to show the table cell's horizontal borders */
    @HostBinding('class.fd-table__cell--no-horizontal-border')
    @Input()
    noBorderX = false;

    /** Whether or not to show the table cell's vertical borders */
    @HostBinding('class.fd-table__cell--no-vertical-border')
    @Input()
    noBorderY = false;

    /** Whether or not the table cell is activable */
    @HostBinding('class.fd-table__cell--activable')
    @Input()
    activable = false;

    /** Whether or not the table cell is focusable */
    @HostBinding('class.fd-table__cell--focusable')
    @Input()
    focusable = false;

    /** Whether or not the table cell is hoverable */
    @HostBinding('class.fd-table__cell--hoverable')
    @Input()
    hoverable = false;

    /** Whether or not the table cell's width should fit to content  */
    @HostBinding('class.fd-table__cell--fit-content')
    @Input()
    fitContent = false;

    /** Whether or not the table cell shouldn't have padding on sides */
    @HostBinding('class.fd-table__cell--no-padding')
    @Input()
    noPadding = false;

    /** Whether or not the table cell indicates that there is no data */
    @HostBinding('class.fd-table__cell--no-data')
    @Input()
    noData = false;

    /** Key of cell element, it's used to identify this cell with certain column */
    @Input()
    key: string;

    /** @hidden */
    @ContentChildren(forwardRef(() => CheckboxComponent))
    _checkboxes: QueryList<CheckboxComponent>;

    /** @hidden */
    @HostBinding('class.fd-table__cell')
    _fdTableCellClass = true;

    constructor(public elementRef: ElementRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this._checkboxes && this._checkboxes.length) {
            this.elementRef.nativeElement.classList.add('fd-table__cell--checkbox');
        }

        if (this.noData) {
            this.elementRef.nativeElement.setAttribute('colspan', '100%');
        }
    }
}

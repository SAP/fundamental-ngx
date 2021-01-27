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
import { CheckboxComponent } from '../../checkbox/checkbox/checkbox.component';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]'
})
export class TableCellDirective implements AfterContentInit {
    /** @hidden */
    @HostBinding('class.fd-table__cell')
    fdTableCellClass = true;

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

    /** @hidden */
    @ContentChildren(forwardRef(() => CheckboxComponent))
    checkboxes: QueryList<CheckboxComponent>;

    /** Key of cell element, it's used to identify this cell with certain column */
    @Input()
    key: string;

    constructor (
        public elementRef: ElementRef
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.checkboxes && this.checkboxes.length) {
            this.elementRef.nativeElement.classList.add('fd-table__cell--checkbox');
        }
    }
}

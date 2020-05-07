import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output
} from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-link]',
    host: {
        '[tabindex]': 'disabled ? -1 : 0'
    }
})
export class MenuLinkDirective {

    /** Mark as disabled */
    @Input()
    @HostBinding('class.is-disabled')
    disabled: boolean = false;

    /** Mark as selected */
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    @Output()
    selectionChange = new EventEmitter<boolean>();

    /** @hidden Whether menu item has currently open sub menu */
    @HostBinding('class.has-child')
    fdHasChildClass: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden Update sub menu visibility */
    @HostListener('click')
    onClick() {
        this.setSelected(!this.selected);
        this.selectionChange.emit(this.selected);
    };

    /** @hidden */
    constructor(public elementRef: ElementRef) { }

    setSelected(isSelected: boolean): void {
        this.selected = isSelected;
    }
}

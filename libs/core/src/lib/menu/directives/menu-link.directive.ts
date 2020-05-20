import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-interactive]',
    host: {
        role: 'menuitem'
    }
})
export class MenuLinkDirective {

    /** Mark as disabled */
    @HostBinding('attr.tabindex')
    focusable: number = 0;

    /** Mark as disabled */
    @HostBinding('class.is-disabled')
    disabled: boolean = false;

    /** Mark as disabled */
    @HostBinding('attr.aria-controls')
    itemId: string = null;

    /** Mark as disabled */
    @HostBinding('class.is-selected')
    @HostBinding('attr.aria-expanded')
    selected: boolean = false;

    /** Mark as disabled */
    @HostBinding('attr.aria-haspopup')
    hasSubmenu: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden */
    constructor(public elementRef: ElementRef) { }

    /** @hidden */
    setSelected(isSelected: boolean): void {
        this.selected = isSelected && this.hasSubmenu;
    }

    /** @hidden */
    setDisabled(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.focusable = isDisabled ? -1 : 0;
    }

    /** @hidden */
    setSubmenu(hasSubmenu: boolean, itemId?: string): void {
        this.hasSubmenu = hasSubmenu;
        this.itemId = itemId || this.itemId;
    }
}

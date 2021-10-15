import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-interactive]',
    host: {
        role: 'menuitem'
    }
})
export class MenuInteractiveDirective {
    /** @hidden */
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @hidden */
    @HostBinding('class.is-disabled')
    disabled = false;

    /** @hidden */
    @HostBinding('attr.aria-controls')
    ariaControls: string = null;

    /** @hidden */
    @HostBinding('class.is-selected')
    @HostBinding('attr.aria-expanded')
    selected = false;

    /** @hidden */
    @HostBinding('attr.aria-haspopup')
    ariaHaspopup = false;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden */
    constructor(public elementRef: ElementRef) {}

    /** @hidden */
    setSelected(isSelected: boolean): void {
        this.selected = isSelected && this.ariaHaspopup;
    }

    /** @hidden */
    setDisabled(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.tabindex = isDisabled ? -1 : 0;
    }

    /** @hidden */
    setSubmenu(hasSubmenu: boolean, itemId?: string): void {
        this.ariaHaspopup = hasSubmenu;
        this.ariaControls = hasSubmenu ? itemId || this.ariaControls : null;
    }
}

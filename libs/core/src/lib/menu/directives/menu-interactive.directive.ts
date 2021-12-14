import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
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
    submenuId: string = null;

    /** @hidden */
    @HostBinding('class.is-selected')
    selected = false;

    /** @hidden */
    @HostBinding('attr.aria-haspopup')
    ariaHaspopup: string = null;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden */
    _fromSplitButton = false;

    /** @hidden */
    private _hasSubmenu = false;

    /** @hidden */
    constructor(public elementRef: ElementRef) {}

    /** @hidden */
    setSelected(isSelected: boolean): void {
        this.selected = isSelected && (this._hasSubmenu || this._fromSplitButton);
    }

    /** @hidden */
    setDisabled(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.tabindex = isDisabled ? -1 : 0;
    }

    /** @hidden */
    setSubmenu(hasSubmenu: boolean, itemId?: string): void {
        this._hasSubmenu = hasSubmenu;
        this.ariaHaspopup = hasSubmenu ? 'menu' : null;
        this.submenuId = hasSubmenu ? itemId || this.submenuId : null;
    }
}

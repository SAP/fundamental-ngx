import { Directive, ElementRef, Host, HostBinding, HostListener, Input } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-link]'
})
export class MenuLinkDirective {

    @Input()
    @HostBinding('class.is-disabled')
    disabled: boolean = false;

    @Input()
    @HostBinding('class.is-active')
    active: boolean = false;

    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = this.hasVisibleChild;

    /** @hidden */
    @HostBinding('class.has-child')
    fdHasChildClass: boolean = this.hasVisibleChild;

    /** @hidden */
    @HostBinding('class.fd-menu__link')
    readonly fdMenuLinkClass: boolean = true;

    /** @hidden */
    @HostListener('click', ['$event']) onClick(event: MouseEvent) {
        if (this._menuItem.hasNestedItems) {
            event.preventDefault();
            this._menuItem.subLevelVisible = !this._menuItem.subLevelVisible;
        }
    };

    constructor(
        @Host() private _menuItem: MenuItemComponent,
        private _elementRef: ElementRef
    ) {
    }

    get hasVisibleChild(): boolean {
        return this._menuItem.hasNestedItems && this._menuItem.subLevelVisible;
    }
}

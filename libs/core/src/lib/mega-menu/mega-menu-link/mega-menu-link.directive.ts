import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

/**
 *  Directive represents mega menu link.
 *  ```html
 * <a fd-mega-menu-link href="#">Link</a>
 *  ```
 * */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-mega-menu-link]',
    host: {
        tabindex: '0'
    }
})
export class MegaMenuLinkDirective {
    /** @hidden */
    @HostBinding('class.fd-mega-menu__link')
    fdMegaMenuClass: boolean = true;

    /** @hidden */
    @Input()
    @HostBinding('class.has-child')
    @HostBinding('attr.aria-haspopup')
    hasChild: boolean = false;

    /** @hidden */
    @Input()
    @HostBinding('attr.aria-expanded')
    isExpanded: boolean = false;

    /** @hidden */
    constructor(public itemEl: ElementRef) {}

    public focus(): void {
        this.itemEl.nativeElement.focus();
    }

    public click(): void {
        this.itemEl.nativeElement.click();
    }
}

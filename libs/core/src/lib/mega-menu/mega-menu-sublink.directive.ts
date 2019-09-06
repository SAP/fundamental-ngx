import { Directive, ElementRef, HostBinding } from '@angular/core';

/**
 *  Directive represents mega menu sub link.
 *  ```html
 * <a fd-mega-menu-sublink href="#">Link</a>
 *  ```
 * */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-mega-menu-sublink]',
    host: {
        'tabindex': '0'
    }
})
export class MegaMenuSublinkDirective {
    /** @hidden */
    @HostBinding('class.fd-mega-menu__sublink')
    fdMegaMenuClass: boolean = true;

    /** @hidden */
    constructor (public itemEl: ElementRef) {}

    public focus(): void {
        this.itemEl.nativeElement.focus();
    }

    public click(): void {
        this.itemEl.nativeElement.click();
    }
}

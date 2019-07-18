import { AfterViewInit, Directive, ElementRef } from '@angular/core';

/**
 * The directive that represents a menu item.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-item]',
})
export class MenuItemDirective implements AfterViewInit {

    /** @hidden */
    constructor (public itemEl: ElementRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.itemEl.nativeElement.classList.add('fd-menu__item');
        this.itemEl.nativeElement.setAttribute('tabindex', '0');
    }

    public focus(): void {
        this.itemEl.nativeElement.focus();
    }

    public click(): void {
        this.itemEl.nativeElement.click();
    }
}

import { AfterViewInit, Directive, ElementRef, OnChanges } from '@angular/core';

/**
 * The directive that represents a menu item.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-item]',
})
export class MenuItemDirective implements AfterViewInit, OnChanges {
    /** @hidden */
    constructor(public itemEl: ElementRef) { }

    /** @hidden */
    ngAfterViewInit() {
        if (
            // if the menu item contains a child anchor element, apply 'fd-menu__item' class to that anchor
            this.itemEl &&
            this.itemEl.nativeElement &&
            this.itemEl.nativeElement.children &&
            this.itemEl.nativeElement.children[0] &&
            this.itemEl.nativeElement.children[0].tagName === 'A'
        ) {
            this.itemEl.nativeElement.children[0].classList.add('fd-menu__item');
        } else if (
            // if the menu item does not contain a child element, apply 'fd-menu__item' class to the fd-menu-item component
            this.itemEl &&
            this.itemEl.nativeElement &&
            this.itemEl.nativeElement.children &&
            this.itemEl.nativeElement.children.length === 0
        ) {
            this.itemEl.nativeElement.classList.add('fd-menu__item');
        }
    }

    /** @hidden */
    ngOnChanges() {
        this.ngAfterViewInit();
    }
}

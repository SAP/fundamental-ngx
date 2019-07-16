import { AfterViewInit, Directive, ElementRef, HostListener, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

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
        if (
            // if the menu item contains a child anchor element, apply 'fd-menu__item' class to that anchor
            this.isChildElementAnchor()
        ) {
            this.getChildrenElements()[0].classList.add('fd-menu__item');
            this.getChildrenElements()[0].setAttribute('tabindex', '0');
        } else {
        // if the menu item does not contain a anchor child element, apply 'fd-menu__item' class to the fd-menu-item component {
            this.itemEl.nativeElement.classList.add('fd-menu__item');
            this.itemEl.nativeElement.setAttribute('tabindex', '0');
        }
    }

    public focus(): void {
        if (this.getChildrenElements() && this.getChildrenElements()[0]) {
            this.getChildrenElements()[0].focus();
        } else {
            this.itemEl.nativeElement.focus();
        }
    }

    public click(): void {
        if (this.getChildrenElements() && this.getChildrenElements()[0]) {
            this.getChildrenElements()[0].click();
        } else {
            this.itemEl.nativeElement.click();
        }
    }

    public isChildElementAnchor(): boolean {
        return this.getChildrenElements() &&
        this.getChildrenElements()[0] &&
        this.getChildrenElements()[0].tagName === 'A'
    }

    private getChildrenElements(): any {
        return this.itemEl &&
            this.itemEl.nativeElement &&
            this.itemEl.nativeElement.children;
    }
}

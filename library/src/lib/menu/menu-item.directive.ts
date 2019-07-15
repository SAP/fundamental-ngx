import { AfterViewInit, Directive, ElementRef, HostListener, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * The directive that represents a menu item.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-item]'
})
export class MenuItemDirective implements AfterViewInit, OnChanges {

    public onKeyDown: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();
    public onClick: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor (public itemEl: ElementRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (
            // if the menu item contains a child anchor element, apply 'fd-menu__item' class to that anchor
            this.isChildElementAnchor()
        ) {
            this.getChildrenElements()[0].classList.add('fd-menu__item');
        } else if (
            // if the menu item does not contain a child element, apply 'fd-menu__item' class to the fd-menu-item component
            this.getChildrenElements() &&
            this.getChildrenElements().length === 0
        ) {
            this.itemEl.nativeElement.classList.add('fd-menu__item');
        }
    }

    public focus(): void {
        if (this.getChildrenElements() && this.getChildrenElements()[0]) {
            this.getChildrenElements()[0].focus();
        }
    }

    @HostListener('keydown', ['$event'])
    keyDown(event: KeyboardEvent): void {
        this.onKeyDown.next(event);
    }


    @HostListener('click')
    clicked(): void {
        this.onClick.next();
    }


    public click(): void {
        if (this.getChildrenElements() && this.getChildrenElements()[0]) {
            this.getChildrenElements()[0].click();
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this.ngAfterViewInit();
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

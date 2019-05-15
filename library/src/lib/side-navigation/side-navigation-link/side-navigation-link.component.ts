import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

/**
 * The component that represents a navigation link.
 * ```html
 *    <fd-side-nav-link>
 *        <a [attr.href]="'#'">Link Item</a>
 *    </fd-side-nav-link>
 * ```
 */
@Component({
    selector: 'fd-side-nav-link',
    templateUrl: './side-navigation-link.component.html'
})
export class SideNavigationLinkComponent implements OnChanges, AfterViewInit {

    /** Whether the link has a sublist. */
    @Input()
    hasSublist: boolean = false;

    /** The href value. */
    @Input()
    href: string;

    /** @hidden */
    @ViewChild('link')
    linkEl: ElementRef;

    /** @hidden */
    sublistIsOpen: boolean = false;

    /** @hidden */
    onKeypressHandler(event) {
        if (this.hasSublist && (event.code === 'Enter' || event.code === 'Space')) {
            event.preventDefault();
            this.sublistIsOpen = !this.sublistIsOpen;
        }
    }

    /** @hidden */
    ngOnChanges() {
        /*
         this function determines what element has been placed in ng-content and applies the fd-side-nav__link class appropriately
         */
        if (!this.hasSublist) {
            if (this.linkEl && this.linkEl.nativeElement) {
                if (this.linkEl.nativeElement.children && this.linkEl.nativeElement.children.length > 0) {
                    const children = this.linkEl.nativeElement.children;
                    for (let i = 0; i < children.length; i++) {
                        // if the item contains a child anchor element, apply 'fd-side-nav__link' class to that anchor
                        if (children[i].tagName === 'A') {
                            children[i].classList.add('fd-side-nav__link');
                        }
                    }
                } else if (this.linkEl.nativeElement.children && this.linkEl.nativeElement.children.length === 0) {
                    // if the item does not contain a child element, apply 'fd-side-nav__link' class to the fd-side-nav-link component
                    this.linkEl.nativeElement.classList.add('fd-side-nav__link');
                }
            }
        }
    }

    /** @hidden */
    ngAfterViewInit() {
        this.ngOnChanges();
    }
}

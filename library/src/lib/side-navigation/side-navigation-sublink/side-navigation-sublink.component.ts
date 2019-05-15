import { AfterViewInit, Component, ElementRef, OnChanges } from '@angular/core';

/**
 * The component that represents a navigation sublink.
 * ```html
 *  <fd-side-nav-sublink>
 *     <a [attr.href]="'#'">Sub Link Item</a>
 *  </fd-side-nav-sublink>
 * ```
 */
@Component({
    selector: 'fd-side-nav-sublink',
    templateUrl: './side-navigation-sublink.component.html'
})
export class SideNavigationSubLinkComponent implements AfterViewInit, OnChanges {
    /** @hidden */
    constructor(private el: ElementRef) {}

    /** @hidden */
    ngAfterViewInit() {
        const child = this.el.nativeElement.children[0];
        if (child.tagName === 'A') {
            child.classList.add('fd-side-nav__sublink');
        }
    }

    /** @hidden */
    ngOnChanges() {
        this.ngAfterViewInit();
    }
}

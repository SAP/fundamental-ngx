import { Directive, ElementRef } from '@angular/core';
/**
 * The component that represents a navigation group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *             <fd-side-nav-item>
 *                <a fd-side-nav-link [attr.href]="'#'">Link Item</a>
 *             </fd-side-nav-item>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-side-nav-sublist]',
    host: {
        class: 'fd-side-nav__sublist'
    }
})
export class SideNavigationSublistDirective {
    public sublistIsOpen: boolean = false;

    public subListIsOpenChange(sublistIsOpen: boolean) {
        this.sublistIsOpen = sublistIsOpen;
        this.elementRef.nativeElement.setAttribute('aria-hidden', !this.sublistIsOpen);
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {}
}

import { Directive, HostBinding } from '@angular/core';

/**
 * Applies the side navigation title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-side-nav-title>Side Nav Title</h1>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-side-nav-title]'
})
export class SideNavigationTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-side-nav__title')
    fdSideNavTitleClass: boolean = true;
}

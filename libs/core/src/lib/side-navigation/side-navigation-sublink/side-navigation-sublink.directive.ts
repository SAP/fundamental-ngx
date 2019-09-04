import { Directive } from '@angular/core';

/**
 * The directive that represents a navigation sublink.
 * ```html
 *     <a fd-side-nav-sublink [attr.href]="'#'">Sub Link Item</a>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-side-nav-sublink]',
    host: {
        class: 'fd-side-nav__sublink'
    }
})
export class SideNavigationSublinkDirective {}

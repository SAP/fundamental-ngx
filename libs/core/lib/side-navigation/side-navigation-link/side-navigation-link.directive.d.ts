import { ElementRef, EventEmitter } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * The component that represents a navigation link.
 * ```html
 *    <a fd-side-nav-link>
 *        <a [attr.href]="'#'">Link Item</a>
 *    </a>
 * ```
 */
export declare class SideNavigationLinkDirective extends AbstractFdNgxClass {
    private elementRef;
    /** Whether the link has a sublist. */
    hasSublist: boolean;
    /** Whether the sub list is opened or closed */
    onSubListOpenChange: EventEmitter<boolean>;
    sublistIsOpen: boolean;
    role: string;
    hasPopup: boolean;
    tabindex: string;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
    /** @hidden */
    onKeypressHandler(event: any): void;
    changeSubListIsOpen(): void;
}

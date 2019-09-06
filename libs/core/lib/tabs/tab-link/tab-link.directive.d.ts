import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Tab link for nav mode
 *
 * ```html
 * <a fd-tab-link>
 *    link
 * </a>
 * ```
 */
export declare class TabLinkDirective extends AbstractFdNgxClass {
    elementRef: ElementRef;
    /** Whether the link is active */
    active: boolean;
    /**
     * Only visual / accessibility thing on tab-nav mode
     * RouterLink does not respect preventDefault/stopPropagation
     */
    disabled: boolean;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}

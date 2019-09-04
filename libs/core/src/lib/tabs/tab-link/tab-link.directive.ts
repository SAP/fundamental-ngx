import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
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

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-link]',
    host: {
        'role': 'tab',
    }
})
export class TabLinkDirective extends AbstractFdNgxClass {

    /** Whether the link is active */
    @Input()
    @HostBinding('attr.aria-selected')
    active: boolean;

    /**
     * Only visual / accessibility thing on tab-nav mode
     * RouterLink does not respect preventDefault/stopPropagation
     */
    @Input()
    @HostBinding('attr.aria-disabled')
    disabled: boolean;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-tabs__link');
        if (this.active) {
            this._addClassToElement('is-selected');
        }
    }

    /** @hidden */
    constructor(public elementRef: ElementRef) {
        super(elementRef);
    }

}

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

    /** Only visual Thing, to disable routerLink does not respect preventDefault/stopPropagation */
    @Input() disabled: boolean;

    /** Whether the link is active */
    @Input() active: boolean;

    /** Whether the link is active */
    @HostBinding('attr.aria-selected')
    get _active(): boolean {
        return this.active;
    }

    /** Only visual Thing, to disable routerLink does not respect preventDefault/stopPropagation */
    @HostBinding('attr.aria-disabled')
    get _disabled(): boolean {
        return this.disabled;
    }

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

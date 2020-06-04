import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
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
        role: 'tab'
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

    /** Event Emitted always when, any keyboard event is dispatched on this element */
    @Output()
    readonly keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

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

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        this.keyDown.emit(e);
    }
}

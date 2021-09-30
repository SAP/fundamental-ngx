import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { AbstractFdNgxClass } from '@fundamental-ngx/core/utils';

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
        role: 'tab',
        tabindex: '-1'
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
    @HostBinding('class.is-disabled')
    disabled: boolean;

    /** Event Emitted always when, any keyboard event is dispatched on this element */
    @Output()
    readonly keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    _setProperties(): void {
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
    onKeyDown(e: KeyboardEvent): void {
        this.keyDown.emit(e);
    }
}

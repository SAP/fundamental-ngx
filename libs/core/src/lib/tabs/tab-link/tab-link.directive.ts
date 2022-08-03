import { FocusableOption } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { AbstractFdNgxClass, KeyUtil } from '@fundamental-ngx/core/utils';

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
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-tab-link]',
    host: {
        role: 'tab',
        tabindex: '-1'
    }
})
export class TabLinkDirective extends AbstractFdNgxClass implements FocusableOption {
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

    @Output()
    readonly focused = new EventEmitter<void>();

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
    @HostListener('focus')
    private _onFocus(): void {
        this.focused.emit();
    }

    @HostListener('keyup', ['$event'])
    private _onKeyUp(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.focused.emit();
        }
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}

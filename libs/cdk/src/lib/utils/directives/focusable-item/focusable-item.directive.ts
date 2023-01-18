import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE } from './focusable-item.tokens';
import { TabbableElementService } from '../../services';
import { HasElementRef } from '../../interfaces';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnFocusableItem]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkFocusableItem]', '[fnFocusableItem]')
        }
    ]
})
export class DeprecatedFocusableItemDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkFocusableItem]',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: FocusableItemDirective
        }
    ]
})
export class FocusableItemDirective implements HasElementRef {
    /** Whether the item is focusable. */
    @Input()
    set fdkFocusableItem(val: BooleanInput) {
        this._focusable = coerceBooleanProperty(val);
        this.setTabbable(this._focusable);
    }

    get fdkFocusableItem(): boolean {
        return this._focusable;
    }

    /** @hidden */
    private _focusable = true;

    /** @hidden */
    private _tabbableElements = new Map<HTMLElement, number>();

    /** @hidden */
    private _tabbable = true;

    /** @hidden */
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        return this._tabbable ? 0 : -1;
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _tabbableElementService: TabbableElementService
    ) {}

    /** Element reference. */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** Set tabbable state */
    setTabbable(state: boolean): void {
        this._tabbable = state;

        if (state) {
            this._enableTabbableElements();
        } else {
            this._disableTabbableElements();
        }
    }

    /** @hidden */
    @HostListener('focusin')
    _onFocusin(): void {
        const tabbableElement = this._tabbableElementService.getTabbableElement(
            this.elementRef().nativeElement,
            false,
            true
        );

        tabbableElement?.focus();
    }

    /** @hidden */
    private _enableTabbableElements(): void {
        if (this._tabbableElements.size === 0) {
            return;
        }

        this._tabbableElements.forEach((tabIndex, element) => (element.tabIndex = tabIndex));
        this._tabbable = false;
    }

    /** @hidden */
    private _disableTabbableElements(): void {
        // Since we cannot select by tabindex attribute (links, inputs, buttons might not have one but still can be focusable),
        // Select all elements from the cell and filter by tabIndex property.
        Array.from(this.elementRef().nativeElement.querySelectorAll<HTMLElement>('*'))
            .filter((elm) => elm.tabIndex >= 0)
            .forEach((elm) => {
                this._tabbableElements.set(elm, elm.tabIndex);
                elm.tabIndex = -1;
            });
    }
}

import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';
import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';
import { FOCUSABLE_ITEM } from './focus-key-manager.tokens';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-focus-key-manager-item], [fdFocusKeyManagerItem]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel(
                '[fdkFocusKeyManagerItem]',
                '[fd-focus-key-manager-item], [fdFocusKeyManagerItem]'
            )
        }
    ]
})
export class DeprecatedFocusKeyManagerItemDirective extends DeprecatedSelector {}

/** Directive to apply Angular Material FocusKeyManager to lists.
 * To be used with FocusKeyManagerItemDirective
 */
@Directive({
    selector: '[fdkFocusKeyManagerItem], [fd-focus-key-manager-item], [fdFocusKeyManagerItem]',
    standalone: true,
    providers: [{ provide: FOCUSABLE_ITEM, useExisting: forwardRef(() => FocusKeyManagerItemDirective) }]
})
export class FocusKeyManagerItemDirective implements FocusableOption {
    /** Whether item should be initially focused */
    @Input()
    set initialFocus(value: BooleanInput) {
        this._initialFocus = coerceBooleanProperty(value);
    }

    /** @hidden */
    @Input()
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        if (this._initialFocus) {
            return 0;
        }

        return this.nativeElement?.tabIndex ?? -1;
    }

    /** @hidden */
    private _initialFocus = false;

    /** Native element of the item */
    get nativeElement(): any {
        return this._elRef?.nativeElement;
    }

    /** @hidden */
    private get _focusKeyManager(): FocusKeyManager<FocusableOption> {
        return this._list.focusKeyManager;
    }

    /** @hidden */
    constructor(private readonly _list: FocusKeyManagerListDirective, private readonly _elRef: ElementRef) {}

    /** @hidden */
    @HostListener('focus')
    _onFocus(): void {
        // For cases where initially selected item doesn't have 0 index
        this._focusKeyManager?.updateActiveItem(this);
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeydown(event: KeyboardEvent): void {
        this._focusKeyManager?.onKeydown(event);
    }

    /** Focus current item native element */
    focus(): void {
        this._elRef?.nativeElement.focus();
    }
}

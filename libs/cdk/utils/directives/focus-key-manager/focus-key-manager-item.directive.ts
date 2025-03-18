import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { booleanAttribute, Directive, ElementRef, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';
import { FOCUSABLE_ITEM } from './focus-key-manager.tokens';

/** Directive to apply Angular Material FocusKeyManager to lists.
 * To be used with FocusKeyManagerItemDirective
 */
@Directive({
    selector: '[fdkFocusKeyManagerItem]',
    standalone: true,
    providers: [{ provide: FOCUSABLE_ITEM, useExisting: forwardRef(() => FocusKeyManagerItemDirective) }]
})
export class FocusKeyManagerItemDirective implements FocusableOption {
    /** Whether item should be initially focused */
    @Input({ transform: booleanAttribute })
    initialFocus = false;

    /** @hidden */
    @Input()
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        return this.initialFocus ? 0 : (this.nativeElement?.tabIndex ?? -1);
    }

    /** Native element of the item */
    get nativeElement(): any {
        return this._elRef?.nativeElement;
    }

    /** @hidden */
    private get _focusKeyManager(): FocusKeyManager<FocusableOption> {
        return this._list.focusKeyManager;
    }

    /** @hidden */
    constructor(
        private readonly _list: FocusKeyManagerListDirective,
        private readonly _elRef: ElementRef
    ) {}

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

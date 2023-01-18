import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE } from './focusable-item.tokens';
import { DestroyedService, TabbableElementService } from '../../services';
import { HasElementRef } from '../../interfaces';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FocusableObserver } from './focusable.observer';
import { takeUntil } from 'rxjs';

export interface ItemPosition {
    row: number;
    col: number;
    totalRows: number;
    totalCols: number;
}

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
        },
        DestroyedService
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

    /** Function, that returns a string to be announced by screen-reader whenever cell receives focus */
    @Input()
    cellFocusedEventAnnouncer: (position: ItemPosition) => string = this._defaultItemFocusedEventAnnouncer;

    /** @hidden */
    private _position: ItemPosition;

    /** @hidden */
    private _focusable = true;

    /** @hidden */
    private _tabbableElements = new Map<HTMLElement, number>();

    /** @hidden */
    private _tabbable = true;

    /** @hidden */
    private _timerId: number | null;

    /** @hidden */
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        return this._tabbable ? 0 : -1;
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _focusableObserver: FocusableObserver,
        private _destroy$: DestroyedService,
        private _tabbableElementService: TabbableElementService,
        private _liveAnnouncer: LiveAnnouncer
    ) {
        this._focusableObserver
            .observe(this._elementRef, false)
            .pipe(takeUntil(this._destroy$))
            .subscribe((isFocusable) => {
                if (isFocusable !== this.fdkFocusableItem) {
                    this.fdkFocusableItem = isFocusable;
                }
            });
    }

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
    _setPosition(position: ItemPosition): void {
        this._position = position;
    }

    /** @hidden */
    @HostListener('focusin')
    async _onFocusin(): Promise<void> {
        if (this._timerId != null) {
            clearTimeout(this._timerId);
            this._timerId = null;
            return;
        }

        const tabbableElement = this._tabbableElementService.getTabbableElement(
            this.elementRef().nativeElement,
            false,
            true
        );

        tabbableElement?.focus();

        this._liveAnnouncer.clear();
        await this._liveAnnouncer.announce(this.cellFocusedEventAnnouncer(this._position));
    }

    /** @hidden */
    @HostListener('focusout')
    _onFocusout(): void {
        this._timerId = setTimeout(() => (this._timerId = null));
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

    /** @hidden */
    private _defaultItemFocusedEventAnnouncer(position: ItemPosition): string {
        return `Column ${position.col + 1} of ${position.totalCols}, row: ${position.row + 1} of ${position.totalRows}`;
    }
}

import { InteractivityChecker, LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, ESCAPE, F2, MAC_ENTER } from '@angular/cdk/keycodes';

import {
    DOCUMENT,
    DestroyRef,
    Directive,
    ElementRef,
    NgZone,
    Renderer2,
    booleanAttribute,
    effect,
    inject,
    input,
    linkedSignal,
    output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, fromEvent } from 'rxjs';
import { KeyUtil } from '../../functions';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';
import { Nullable } from '../../models/nullable';
import { TabbableElementService } from '../../services';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE } from './focusable-item.tokens';
import { FocusableItem } from './focusable.item';
import { FocusableObserver } from './focusable.observer';

export type CellFocusedEventAnnouncer = Nullable<(position: FocusableItemPosition) => string>;

export interface FocusableItemPosition {
    rowIndex: number;
    colIndex: number;
    totalRows: number;
    totalCols: number;
}

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
export class FocusableItemDirective implements FocusableItem, HasElementRef {
    /** @hidden Input with booleanAttribute transform */
    readonly fdkFocusableItem = input(true, { transform: booleanAttribute });
    /** Function, which returns a string to be announced by screen-reader whenever an item which is in grid receives focus. */
    readonly cellFocusedEventAnnouncer = input<CellFocusedEventAnnouncer>(this._defaultItemFocusedEventAnnouncer);

    /** Event emitted when the cell receives focus, not being emitted when focus moves between item's children. */
    readonly cellFocused = output<FocusableItemPosition>();

    /** Event emitted when a focusable child element is focused. */
    readonly focusableChildElementFocused = output<void>();

    /** @hidden */
    readonly _parentFocusableItemFocused = output<void>();

    /** Element reference. */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    readonly keydown = new Subject<KeyboardEvent>();

    /** @hidden */
    _position: FocusableItemPosition;

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    protected readonly _zone = inject(NgZone);

    /**
     * Internal _focusable state that can be mutated programmatically.
     * Syncs with the fdkFocusableItem input but allows internal modification.
     * @hidden
     */
    private readonly _focusable = linkedSignal(() => this.fdkFocusableItem());

    /** @hidden */
    private _tabbableElements = new Map<HTMLElement, number>();

    /** @hidden */
    private _tabbable = true;

    /** @hidden */
    private readonly _focusableObserver = inject(FocusableObserver);

    /** @hidden */
    private readonly _tabbableElementService = inject(TabbableElementService);

    /** @hidden */
    private readonly _liveAnnouncer = inject(LiveAnnouncer);
    /** @hidden */
    private readonly _renderer2 = inject(Renderer2);

    /** @hidden */
    private readonly _document = inject(DOCUMENT);

    /** @hidden */
    private readonly _checker = inject(InteractivityChecker);

    /** @hidden */
    constructor() {
        // Update tabbable state when focusable state changes
        effect(() => {
            const focusable = this.fdkFocusableItem();
            this.setTabbable(focusable);
        });

        this._focusableObserver
            .observe(this.elementRef, false)
            .pipe(takeUntilDestroyed())
            .subscribe((isFocusable) => {
                if (isFocusable !== this.isFocusable()) {
                    this.setFocusable(isFocusable);
                }
            });

        this._zone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'focusin')
                .pipe(takeUntilDestroyed())
                .subscribe(async () => {
                    await this._onFocusin();
                });

            fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown')
                .pipe(takeUntilDestroyed())
                .subscribe((event) => {
                    this._onKeydown(event);
                });
        });
    }

    /** @hidden */
    element = (): HTMLElement => this.elementRef.nativeElement;

    /**
     * Programmatically set the _focusable state.
     * This allows parent components to update the _focusable state.
     */
    setFocusable(state: boolean): void {
        this._focusable.set(state);
    }

    /**
     * Interface method required by FocusableItem.
     * Returns the current focusable state from the internal signal.
     * @hidden
     */
    isFocusable(): boolean {
        return this._focusable();
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    /** Set tabbable state */
    setTabbable(state: boolean): void {
        this._zone.runOutsideAngular(() => {
            this._tabbable = state;
            this._renderer2.setAttribute(this.elementRef.nativeElement, 'tabindex', this._tabbable ? '0' : '-1');
        });
    }

    /** @hidden */
    enableTabbableElements(): void {
        if (this._tabbableElements.size === 0) {
            return;
        }

        this._tabbableElements.forEach((tabIndex, element) => (element.tabIndex = tabIndex));
        this._tabbable = false;
    }

    /** @hidden */
    disableTabbableElements(): void {
        // Since we cannot select by tabindex attribute (links, inputs, buttons might not have one but still can be focusable),
        // Select all elements from the cell and filter by tabIndex property.
        Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>('*'))
            .filter((elm) => elm.tabIndex >= 0)
            .forEach((elm) => {
                this._tabbableElements.set(elm, elm.tabIndex);
                elm.tabIndex = -1;
            });
    }

    /** @hidden */
    private async _onFocusin(): Promise<void> {
        if (!this.isFocusable()) {
            return;
        }

        if (this._position) {
            this.cellFocused.emit(this._position);

            const announcer = this.cellFocusedEventAnnouncer();
            if (announcer) {
                this._liveAnnouncer.clear();
                await this._liveAnnouncer.announce(announcer(this._position));
            }
        }

        const activeEl = this._document.activeElement as HTMLElement;

        if (activeEl === this.elementRef.nativeElement) {
            this._parentFocusableItemFocused.emit();
        } else if (activeEl && activeEl !== this.elementRef.nativeElement && this._checker.isFocusable(activeEl)) {
            this.focusableChildElementFocused.emit();
        }
    }

    /** @hidden */
    private _onKeydown(event: KeyboardEvent): void {
        if (!this.isFocusable()) {
            return;
        }
        const activeEl = this._document.activeElement;
        const isFocused = activeEl === this.elementRef.nativeElement;
        const shouldFocusChild = KeyUtil.isKeyCode(event, [ENTER, MAC_ENTER, F2]) && !event.shiftKey && isFocused;
        const shouldFocusCell =
            ((KeyUtil.isKeyCode(event, F2) && event.shiftKey) || KeyUtil.isKeyCode(event, ESCAPE)) && !isFocused;

        if (shouldFocusChild) {
            event.stopPropagation();

            const tabbableElement = this._tabbableElementService.getTabbableElement(
                this.elementRef.nativeElement,
                false,
                true
            );

            tabbableElement?.focus();

            this.focusableChildElementFocused.emit();

            return;
        } else if (shouldFocusCell) {
            event.stopPropagation();

            this.elementRef.nativeElement.focus();

            return;
        }

        if (isFocused) {
            this.keydown.next(event);
        }
    }

    /** @hidden */
    private _defaultItemFocusedEventAnnouncer(position: FocusableItemPosition): string {
        return `Column ${position.colIndex + 1} of ${position.totalCols}, row: ${position.rowIndex + 1} of ${
            position.totalRows
        }`;
    }
}

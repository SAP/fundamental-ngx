import { Directive, ElementRef, EventEmitter, HostBinding, inject, Input, NgZone, Output } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, ESCAPE, F2, MAC_ENTER } from '@angular/cdk/keycodes';
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
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { Nullable } from '../../models/nullable';
import { KeyUtil } from '../../functions';

export type CellFocusedEventAnnouncer = Nullable<(position: FocusableItemPosition) => string>;

export interface FocusableItemPosition {
    rowIndex: number;
    colIndex: number;
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
    /** Whether the item is focusable. Default is true. */
    @Input()
    set fdkFocusableItem(val: BooleanInput) {
        this._focusable = coerceBooleanProperty(val);
        this.setTabbable(this._focusable);
    }

    get fdkFocusableItem(): boolean {
        return this._focusable;
    }

    /** Function, which returns a string to be announced by screen-reader whenever an item which is in grid receives focus. */
    @Input()
    cellFocusedEventAnnouncer: CellFocusedEventAnnouncer = this._defaultItemFocusedEventAnnouncer;

    /** Event emitted when the cell receives focus, not being emitted when focus moves between item's children. */
    @Output()
    readonly cellFocused = new EventEmitter<FocusableItemPosition>();

    /** @hidden */
    public readonly _keydown$ = new Subject<KeyboardEvent>();

    /** @hidden */
    _position: FocusableItemPosition;

    /** @hidden */
    private _focusable = true;

    /** @hidden */
    private _tabbableElements = new Map<HTMLElement, number>();

    /** @hidden */
    private _tabbable = true;

    /** @hidden */
    private _timerId: ReturnType<typeof setTimeout> | null;

    /** @hidden */
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        return this._tabbable ? 0 : -1;
    }

    /** Element reference. */
    public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    /** @hidden */
    private readonly _focusableObserver = inject(FocusableObserver);
    /** @hidden */
    protected readonly _destroy$ = inject(DestroyedService);
    /** @hidden */
    private readonly _tabbableElementService = inject(TabbableElementService);
    /** @hidden */
    private readonly _liveAnnouncer = inject(LiveAnnouncer);
    /** @hidden */
    protected readonly _zone = inject(NgZone);

    /** @hidden */
    constructor() {
        this._focusableObserver
            .observe(this.elementRef, false)
            .pipe(takeUntil(this._destroy$))
            .subscribe((isFocusable) => {
                if (!isFocusable && isFocusable !== this.fdkFocusableItem) {
                    this.fdkFocusableItem = isFocusable;
                }
            });

        this._zone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'focusin')
                .pipe(takeUntil(this._destroy$))
                .subscribe(async () => {
                    await this._onFocusin();
                });

            fromEvent(this.elementRef.nativeElement, 'focusout')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                    this._onFocusout();
                });

            fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown')
                .pipe(takeUntil(this._destroy$))
                .subscribe((event) => {
                    this._onKeydown(event);
                });
        });
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
    // @HostListener('focusin')
    private async _onFocusin(): Promise<void> {
        if (!this.fdkFocusableItem) {
            return;
        }

        if (this._timerId != null) {
            clearTimeout(this._timerId);
            this._timerId = null;
            return;
        }

        if (this._position) {
            this.cellFocused.next(this._position);

            if (this.cellFocusedEventAnnouncer) {
                this._liveAnnouncer.clear();
                await this._liveAnnouncer.announce(this.cellFocusedEventAnnouncer(this._position));
            }
        }
    }

    /** @hidden */
    // @HostListener('focusout')
    private _onFocusout(): void {
        if (!this.fdkFocusableItem) {
            return;
        }

        // Timeout is needed to prevent focusout event from being emitted when focus moves between item's children.
        this._timerId = setTimeout(() => (this._timerId = null));
    }

    /** @hidden */
    // @HostListener('keydown', ['$event'])
    private _onKeydown(event: KeyboardEvent): void {
        if (!this.fdkFocusableItem) {
            return;
        }

        const isFocused = document.activeElement === this.elementRef.nativeElement;
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

            return;
        } else if (shouldFocusCell) {
            event.stopPropagation();

            this.elementRef.nativeElement.focus();

            return;
        }

        if (isFocused) {
            this._keydown$.next(event);
        }
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
        Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>('*'))
            .filter((elm) => elm.tabIndex >= 0)
            .forEach((elm) => {
                this._tabbableElements.set(elm, elm.tabIndex);
                elm.tabIndex = -1;
            });
    }

    /** @hidden */
    private _defaultItemFocusedEventAnnouncer(position: FocusableItemPosition): string {
        return `Column ${position.colIndex + 1} of ${position.totalCols}, row: ${position.rowIndex + 1} of ${
            position.totalRows
        }`;
    }
}

import { DOCUMENT } from '@angular/common';
import {
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    NgZone,
    Output
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, ESCAPE, F2, MAC_ENTER } from '@angular/cdk/keycodes';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE } from './focusable-item.tokens';
import { TabbableElementService } from '../../services';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FocusableObserver } from './focusable.observer';
import { fromEvent, Subject } from 'rxjs';
import { Nullable } from '../../models/nullable';
import { KeyUtil } from '../../functions';
import { FocusableItem } from './focusable.item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class FocusableItemDirective implements FocusableItem {
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

    /** Element reference. */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    readonly keydown = new Subject<KeyboardEvent>();

    /** @hidden */
    _position: FocusableItemPosition;

    /** @hidden */
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        return this._tabbable ? 0 : -1;
    }

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);
    /** @hidden */
    protected readonly _zone = inject(NgZone);

    /** @hidden */
    private _focusable = true;

    /** @hidden */
    private _tabbableElements = new Map<HTMLElement, number>();

    /** @hidden */
    private _tabbable = true;
    /** @hidden */
    private _timerId: ReturnType<typeof setTimeout> | null;
    /** @hidden */
    private readonly _focusableObserver = inject(FocusableObserver);
    /** @hidden */
    private readonly _tabbableElementService = inject(TabbableElementService);
    /** @hidden */
    private readonly _liveAnnouncer = inject(LiveAnnouncer);

    /** @hidden */
    private readonly _document = inject(DOCUMENT);

    /** @hidden */
    constructor() {
        this._focusableObserver
            .observe(this.elementRef, false)
            .pipe(takeUntilDestroyed())
            .subscribe((isFocusable) => {
                if (!isFocusable && isFocusable !== this.fdkFocusableItem) {
                    this.fdkFocusableItem = isFocusable;
                }
            });

        this._zone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'focusin')
                .pipe(takeUntilDestroyed())
                .subscribe(async () => {
                    await this._onFocusin();
                });

            fromEvent(this.elementRef.nativeElement, 'focusout')
                .pipe(takeUntilDestroyed())
                .subscribe(() => {
                    this._onFocusout();
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

    /** @hidden */
    isFocusable(): boolean {
        return this._focusable;
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
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
    private _onFocusout(): void {
        if (!this.fdkFocusableItem) {
            return;
        }

        // Timeout is needed to prevent focusout event from being emitted when focus moves between item's children.
        this._timerId = setTimeout(() => (this._timerId = null));
    }

    /** @hidden */
    private _onKeydown(event: KeyboardEvent): void {
        if (!this.fdkFocusableItem) {
            return;
        }

        const isFocused = this._document.activeElement === this.elementRef.nativeElement;
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
            this.keydown.next(event);
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

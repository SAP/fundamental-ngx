import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, ESCAPE, F2, MAC_ENTER } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import {
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    Output,
    Renderer2,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, fromEvent } from 'rxjs';
import { KeyUtil } from '../../functions';
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

    /** @ignore */
    readonly keydown = new Subject<KeyboardEvent>();

    /** @ignore */
    _position: FocusableItemPosition;

    /** @ignore */
    protected readonly _destroyRef = inject(DestroyRef);
    /** @ignore */
    protected readonly _zone = inject(NgZone);

    /** @ignore */
    private _focusable = true;

    /** @ignore */
    private _tabbableElements = new Map<HTMLElement, number>();

    /** @ignore */
    private _tabbable = true;
    /** @ignore */
    private _timerId: ReturnType<typeof setTimeout> | null;
    /** @ignore */
    private readonly _focusableObserver = inject(FocusableObserver);
    /** @ignore */
    private readonly _tabbableElementService = inject(TabbableElementService);
    /** @ignore */
    private readonly _liveAnnouncer = inject(LiveAnnouncer);

    /** @ignore */
    private readonly _renderer2 = inject(Renderer2);

    /** @ignore */
    private readonly _document = inject(DOCUMENT);

    /** @ignore */
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

    /** @ignore */
    element = (): HTMLElement => this.elementRef.nativeElement;

    /** @ignore */
    isFocusable(): boolean {
        return this._focusable;
    }

    /** @ignore */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    /** Set tabbable state */
    setTabbable(state: boolean): void {
        this._tabbable = state;
        this._renderer2.setAttribute(this.elementRef.nativeElement, 'tabindex', this._tabbable ? '0' : '-1');

        if (state) {
            this._enableTabbableElements();
        } else {
            this._disableTabbableElements();
        }
    }

    /** @ignore */
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

    /** @ignore */
    private _onFocusout(): void {
        if (!this.fdkFocusableItem) {
            return;
        }

        // Timeout is needed to prevent focusout event from being emitted when focus moves between item's children.
        this._timerId = setTimeout(() => (this._timerId = null));
    }

    /** @ignore */
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

    /** @ignore */
    private _enableTabbableElements(): void {
        if (this._tabbableElements.size === 0) {
            return;
        }

        this._tabbableElements.forEach((tabIndex, element) => (element.tabIndex = tabIndex));
        this._tabbable = false;
    }

    /** @ignore */
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

    /** @ignore */
    private _defaultItemFocusedEventAnnouncer(position: FocusableItemPosition): string {
        return `Column ${position.colIndex + 1} of ${position.totalCols}, row: ${position.rowIndex + 1} of ${
            position.totalRows
        }`;
    }
}

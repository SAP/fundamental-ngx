import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
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
import { Nullable } from '../../models/nullable';
import { KeyUtil } from '../../functions';
import { ENTER, ESCAPE, F2, LEFT_ARROW, MAC_ENTER, RIGHT_ARROW } from '@angular/cdk/keycodes';

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

    /** Whether tabbable child should be focused instead. Default is false. */
    @Input()
    set focusChild(val: BooleanInput) {
        this._focusChild = coerceBooleanProperty(val);
        this.setTabbable(this._focusable);
    }

    get focusChild(): boolean {
        return this._focusChild;
    }

    /** Function, which returns a string to be announced by screen-reader whenever an item which is in grid receives focus. */
    @Input()
    cellFocusedEventAnnouncer: CellFocusedEventAnnouncer = this._defaultItemFocusedEventAnnouncer;

    /** Event emitted when the cell receives focus, not being emitted when focus moves between item's children. */
    @Output()
    readonly cellFocused = new EventEmitter<FocusableItemPosition>();

    /** @hidden */
    _position: FocusableItemPosition;

    /** @hidden */
    private _focusChild = false;

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
                if (!isFocusable && isFocusable !== this.fdkFocusableItem) {
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

        if (!this.focusChild) {
            return;
        }

        if (state) {
            this._enableTabbableElements();
        } else {
            this._disableTabbableElements();
        }
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, MAC_ENTER, F2])) {
            if (event.target && this._eventTargetIsInput(event.target)) {
                this.elementRef().nativeElement.focus();
            } else {
                this._focusChildElement();
            }
        } else if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this.elementRef().nativeElement.focus();
        } else if (
            KeyUtil.isKeyCode(event, [RIGHT_ARROW, LEFT_ARROW]) &&
            event.target &&
            this._eventTargetIsInput(event.target)
        ) {
            event.stopImmediatePropagation();
        }
    }

    /** @hidden */
    @HostListener('focusin')
    async _onFocusin(): Promise<void> {
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
    @HostListener('focusout')
    _onFocusout(): void {
        if (!this.fdkFocusableItem) {
            return;
        }

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
    private _defaultItemFocusedEventAnnouncer(position: FocusableItemPosition): string {
        return `Column ${position.colIndex + 1} of ${position.totalCols}, row: ${position.rowIndex + 1} of ${
            position.totalRows
        }`;
    }

    /** @hidden */
    private _focusChildElement(): void {
        const tabbableElement = this._tabbableElementService.getTabbableElement(
            this.elementRef().nativeElement,
            false,
            true
        );

        tabbableElement?.focus();
    }

    /** @hidden */
    private _eventTargetIsInput(eventTarget: EventTarget): boolean {
        return (eventTarget as HTMLElement).tagName === 'INPUT' || (eventTarget as HTMLElement).tagName === 'TEXTAREA';
    }
}

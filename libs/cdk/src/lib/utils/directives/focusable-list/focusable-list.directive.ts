import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ContentChildren,
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { finalize, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FocusableItemPosition } from '../focusable-item/focusable-item.directive';
import {
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FocusableItem,
    FocusableListPosition,
    FocusableObserver,
    isItemFocusable
} from '../focusable-item';
import { FDK_FOCUSABLE_LIST_DIRECTIVE } from './focusable-list.tokens';
import { merge, Subject } from 'rxjs';
import { Nullable } from '../../models/nullable';
import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { intersectionObservable, KeyUtil } from '../../functions';
import { ENTER, ESCAPE, F2, MAC_ENTER } from '@angular/cdk/keycodes';
import { scrollIntoView, ScrollPosition } from './scroll';
import { getItemElement } from '../focusable-item/get-item-element';
import { destroyObservable } from '../../helpers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface FocusableListItemFocusedEvent {
    index: number;
    total: number;
}

export interface FocusableListKeydownEvent {
    list: FocusableListDirective;
    event: KeyboardEvent;
    activeItemIndex: Nullable<number>;
}

interface FocusableListConfig {
    wrap?: boolean;
    direction?: 'vertical' | 'horizontal';
    contentDirection?: 'ltr' | 'rtl' | null;
}

@Directive({
    selector: '[fdkFocusableList]',
    exportAs: 'fdkFocusableList',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: FocusableListDirective
        }
    ]
})
export class FocusableListDirective implements OnChanges, AfterViewInit, OnDestroy {
    /** Whether the whole list should be focusable, handy in grids. */
    @Input()
    set focusable(value: BooleanInput) {
        this._focusable = coerceBooleanProperty(value);

        this.setTabbable(this._focusable);
    }

    get focusable(): boolean {
        return this._focusable;
    }

    /** Direction of navigation. Should be set to 'grid' when list is a part of grid. */
    @Input()
    navigationDirection: 'horizontal' | 'vertical' | 'grid' = 'vertical';

    /** Direction of the content. */
    @Input()
    contentDirection: 'ltr' | 'rtl' | null = 'ltr';

    /**
     * Configures wrapping mode which determines whether the active item will wrap to the other end of list when there are no more items in the given direction.
     */
    @Input()
    wrap = false;

    /** Function, which returns a string to be announced by screen-reader whenever an row which is in grid receives focus. */
    @Input()
    listFocusedEventAnnouncer: (position: FocusableListPosition) => string = this._defaultListFocusedEventAnnouncer;

    /** Event emitted when list's item focused, contains item's position info. */
    @Output()
    readonly itemFocused = new EventEmitter<FocusableListItemFocusedEvent>();

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE, { descendants: true })
    readonly _projectedFocusableItems: QueryList<FocusableItem>;

    /** @hidden */
    get _focusableItems(): QueryList<FocusableItem> {
        return this._items ? this._items : this._projectedFocusableItems;
    }

    /** @hidden */
    _items: QueryList<FocusableItem> | undefined;

    /** @hidden */
    readonly _gridItemFocused$ = new Subject<FocusableItemPosition>();

    /** @hidden */
    readonly _gridListFocused$ = new Subject<FocusableListPosition>();

    /** @hidden */
    readonly _keydown$ = new Subject<FocusableListKeydownEvent>();

    /** @hidden */
    _isVisible = false;

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    protected _focusable = false;

    /** @hidden */
    private _gridPosition: { rowIndex: number; totalRows: number };

    /** @hidden */
    private _keyManager?: FocusKeyManager<FocusableItem>;

    /** @hidden */
    private _tabbable = false;

    /** @hidden */
    private readonly _refreshItems$ = new Subject<void>();
    /** @hidden */
    private readonly _refresh$ = new Subject<void>();
    /** @hidden */
    private readonly _renderer = inject(Renderer2);
    /** @hidden */
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    /** @hidden */
    private readonly _liveAnnouncer = inject(LiveAnnouncer);
    /** @hidden */
    private readonly _focusableObserver = inject(FocusableObserver);

    /** @hidden */
    private readonly _document = inject(DOCUMENT);

    /** @hidden */
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        return this._tabbable ? 0 : -1;
    }

    /** @hidden */
    constructor() {
        intersectionObservable(this._elementRef.nativeElement, { threshold: 0.25 })
            .pipe(takeUntilDestroyed())
            .subscribe((isVisible) => (this._isVisible = isVisible[0]?.isIntersecting));

        this._focusableObserver
            .observe(this._elementRef, false)
            .pipe(takeUntilDestroyed())
            .subscribe((isFocusable) => {
                if (!isFocusable && isFocusable !== this.focusable) {
                    this.focusable = isFocusable;
                }
            });
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeydown(event: KeyboardEvent): void {
        // Already handled
        if (event.defaultPrevented) {
            return;
        }

        const isFocused = this._document.activeElement === this._elementRef.nativeElement;
        const shouldFocusChild = KeyUtil.isKeyCode(event, [ENTER, MAC_ENTER, F2]) && !event.shiftKey && isFocused;
        const shouldFocusList =
            ((KeyUtil.isKeyCode(event, F2) && event.shiftKey) || KeyUtil.isKeyCode(event, ESCAPE)) && !isFocused;

        if (shouldFocusChild) {
            event.stopPropagation();

            this.setActiveItem(0);

            return;
        } else if (shouldFocusList) {
            event.stopPropagation();

            this.focus();

            return;
        }

        this._keydown$.next({ list: this, event, activeItemIndex: this._keyManager?.activeItemIndex ?? null });
    }

    /** @hidden */
    @HostListener('focus')
    async _onFocus(): Promise<void> {
        if (this._gridPosition) {
            this._gridListFocused$.next(this._gridPosition);

            this._liveAnnouncer.clear();
            await this._liveAnnouncer.announce(this.listFocusedEventAnnouncer(this._gridPosition));

            this.setTabbable(true);
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._keyManager) {
            return;
        }

        if (changes['wrap']) {
            this._keyManager = this._keyManager.withWrap(changes['wrap'].currentValue);
        }

        if (changes['navigationDirection']) {
            this._updateNavigationDirection();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenOnItems();
    }

    /** Set items programmatically. */
    setItems(items: QueryList<FocusableItem>): void {
        this._items = items;
        this._listenOnItems();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyManager?.destroy();
    }

    /** Set active item in list */
    setActiveItem(index: number, scrollPosition?: ScrollPosition): void {
        let availableIndex;

        this._focusableItems.find((item, itemIndex) => {
            if (itemIndex >= index && isItemFocusable(item)) {
                availableIndex = itemIndex;
                return true;
            }

            return false;
        });

        if (availableIndex != null) {
            scrollIntoView(getItemElement(this._focusableItems.get(availableIndex)), scrollPosition);
            this._keyManager?.setActiveItem(availableIndex);
        }
    }

    /** Focus whole list */
    focus(scrollPosition?: ScrollPosition): void {
        if (this.focusable) {
            scrollIntoView(this._elementRef.nativeElement, scrollPosition);
            this._elementRef.nativeElement.focus();
        }
    }

    /** Set tabbable state */
    setTabbable(state: boolean): void {
        this._tabbable = state;
    }

    /** @hidden */
    _updateNavigationDirection(): void {
        if (!this._keyManager) {
            return;
        }

        if (this.navigationDirection === 'vertical') {
            this._keyManager = this._keyManager.withVerticalOrientation(true);
            this._keyManager = this._keyManager.withHorizontalOrientation(null);
        } else {
            this._keyManager = this._keyManager.withVerticalOrientation(false);
            this._keyManager = this._keyManager.withHorizontalOrientation(this.contentDirection || 'ltr');
        }
    }

    /** @hidden */
    _setItemsTabbable(state: boolean): void {
        this._focusableItems.forEach((item) => item.setTabbable(state));
    }

    /** @hidden */
    _setGridPosition(position: FocusableListPosition): void {
        this._gridPosition = position;

        this._focusableItems.changes
            .pipe(startWith(this._focusableItems), takeUntilDestroyed(this._destroyRef))
            .subscribe((items) =>
                items.forEach(
                    (item, index) =>
                        (item._position = {
                            ...this._gridPosition,
                            colIndex: index,
                            totalCols: this._focusableItems.length
                        })
                )
            );
    }

    /** @hidden */
    private _initializeFocusManager(items: FocusableItem[], config: FocusableListConfig = {}): void {
        this._refreshItems$.next();

        let keyManager = new FocusKeyManager<any>(items).withHomeAndEnd();

        if (config.wrap !== false) {
            keyManager = keyManager.withWrap();
        }

        if (config.direction === 'horizontal') {
            keyManager = keyManager.withHorizontalOrientation(config.contentDirection || 'ltr'); // should be replaced

            // Vertical is enabled by default, so let's disable it here in consistency purposes
            keyManager = keyManager.withVerticalOrientation(false);
        }

        keyManager.skipPredicate((i) => !isItemFocusable(i));

        this._keyManager = keyManager;

        const focusListenerDestroyers = items.map((item, index) =>
            this._renderer.listen(getItemElement(item), 'focus', () => {
                const directiveItem = this._focusableItems.get(index);
                if (!directiveItem) {
                    return;
                }

                if (this._gridPosition) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this._gridItemFocused$.next(directiveItem._position!);
                }

                this.itemFocused.next({ index, total: items.length });
                this._focusableItems.forEach((i) => i.setTabbable(i === directiveItem));
                this._keyManager?.setActiveItem(index);
            })
        );

        merge(...items.map((item) => item.keydown))
            .pipe(
                tap((event: KeyboardEvent) => {
                    // Already handled
                    if (event.defaultPrevented) {
                        return;
                    }

                    this._keyManager?.onKeydown(event);
                }),
                takeUntil(merge(this._refreshItems$, destroyObservable(this._destroyRef))),
                finalize(() => focusListenerDestroyers.forEach((d) => d()))
            )
            .subscribe();
    }

    /** @hidden */
    private _defaultListFocusedEventAnnouncer(position: FocusableListPosition): string {
        return `Row: ${position.rowIndex + 1} of ${position.totalRows}, use F2 button to dive in and focus list's item`;
    }

    /** @hidden */
    private _listenOnItems(): void {
        const refresh$ = merge(this._refresh$, destroyObservable(this._destroyRef));
        this._refresh$.next();
        this._focusableItems.changes
            .pipe(
                startWith(null),
                map(() => this._focusableItems.toArray()),
                tap((items: FocusableItem[]): void => {
                    const direction = this.navigationDirection === 'grid' ? 'horizontal' : this.navigationDirection;

                    this._initializeFocusManager(items, {
                        direction,
                        contentDirection: this.contentDirection,
                        wrap: this.wrap
                    });
                }),
                takeUntil(refresh$)
            )
            .subscribe();
    }
}

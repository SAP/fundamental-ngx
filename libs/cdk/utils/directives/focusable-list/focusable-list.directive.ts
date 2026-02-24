import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, ESCAPE, F2, MAC_ENTER } from '@angular/cdk/keycodes';

import {
    AfterViewInit,
    DOCUMENT,
    DestroyRef,
    Directive,
    ElementRef,
    Injector,
    Input,
    OnDestroy,
    Renderer2,
    booleanAttribute,
    computed,
    contentChildren,
    effect,
    inject,
    input,
    model,
    output,
    runInInjectionContext,
    signal,
    untracked
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, merge } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { KeyUtil, intersectionObservable } from '../../functions';
import { destroyObservable } from '../../helpers';
import {
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FocusableItem,
    FocusableListPosition,
    FocusableObserver,
    isItemFocusable
} from '../focusable-item';
import { FocusableItemPosition } from '../focusable-item/focusable-item.directive';
import { getItemElement } from '../focusable-item/get-item-element';
import { FDK_FOCUSABLE_LIST_DIRECTIVE } from './focusable-list.tokens';
import { ScrollPosition, scrollIntoView } from './scroll';

export interface FocusableListItemFocusedEvent {
    index: number;
    total: number;
    id?: string | null;
}

export interface FocusableListKeydownEvent {
    list: FocusableListDirective;
    event: KeyboardEvent;
    activeItemIndex: number | null | undefined;
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
    host: {
        '[attr.tabindex]': '_tabindex',
        '(keydown)': '_onKeydown($event)',
        '(focus)': '_onFocus()'
    },
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: FocusableListDirective
        }
    ]
})
export class FocusableListDirective implements AfterViewInit, OnDestroy {
    /** Whether the whole list should be focusable, handy in grids. */
    @Input({ transform: booleanAttribute })
    set focusable(value: boolean) {
        this._focusable = value;

        this.setTabbable(this._focusable);
    }

    get focusable(): boolean {
        return this._focusable;
    }

    /** Direction of navigation. Should be set to 'grid' when list is a part of grid. */
    readonly navigationDirection = model<'horizontal' | 'vertical' | 'grid'>('vertical');

    /** Direction of the content. */
    readonly contentDirection = model<'ltr' | 'rtl' | null>('ltr');

    /**
     * Configures wrapping mode which determines whether the active item will wrap to the other end of list when there are no more items in the given direction.
     */
    readonly wrap = input(false, { transform: booleanAttribute });

    /** Function, which returns a string to be announced by screen-reader whenever an row which is in grid receives focus. */
    readonly listFocusedEventAnnouncer = input<(position: FocusableListPosition) => string>(
        this._defaultListFocusedEventAnnouncer
    );

    /** Event emitted when list's item focused, contains item's position info. */
    readonly itemFocused = output<FocusableListItemFocusedEvent>();

    /** @hidden */
    readonly _projectedFocusableItems = contentChildren<FocusableItem>(FDK_FOCUSABLE_ITEM_DIRECTIVE, {
        descendants: true
    });

    /** @hidden */
    readonly _itemsOverride = signal<ReadonlyArray<FocusableItem> | null>(null);

    /** @hidden */
    readonly _focusableItems = computed<ReadonlyArray<FocusableItem>>(
        () => this._itemsOverride() ?? this._projectedFocusableItems()
    );

    /** @hidden */
    readonly _gridItemFocused$ = new Subject<FocusableItemPosition>();

    /** @hidden */
    readonly _gridListFocused$ = new Subject<FocusableListPosition>();

    /** @hidden */
    readonly _keydown$ = new Subject<FocusableListKeydownEvent>();

    /** @hidden */
    readonly _isVisible = signal(false);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    protected _focusable = false;

    /** @hidden */
    private readonly _gridPosition = signal<FocusableListPosition | null>(null);

    /** @hidden */
    private _keyManager?: FocusKeyManager<FocusableItem>;

    /** @hidden */
    private _tabbable = signal(false);

    /** @hidden */
    private readonly _refreshItems$ = new Subject<void>();
    /** @hidden */
    private _itemsEffectInitialized = false;
    /** @hidden */
    private readonly _renderer = inject(Renderer2);
    /** @hidden */
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    /** @hidden */
    private readonly _liveAnnouncer = inject(LiveAnnouncer);
    /** @hidden */
    private readonly _focusableObserver = inject(FocusableObserver);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _document = inject(DOCUMENT);

    /** @hidden */
    get _tabindex(): number {
        return this._tabbable() ? 0 : -1;
    }

    /** @hidden */
    constructor() {
        intersectionObservable(this._elementRef.nativeElement, { threshold: 0.25 })
            .pipe(takeUntilDestroyed())
            .subscribe((isVisible) => this._isVisible.set(isVisible[0]?.isIntersecting));

        this._focusableObserver
            .observe(this._elementRef, false)
            .pipe(takeUntilDestroyed())
            .subscribe((isFocusable) => {
                if (!isFocusable && isFocusable !== this.focusable) {
                    this.focusable = isFocusable;
                }
            });

        effect(() => {
            const wrap = this.wrap();
            if (this._keyManager) {
                this._keyManager = this._keyManager.withWrap(wrap);
            }
        });

        effect(() => {
            this.navigationDirection();
            this.contentDirection();
            if (this._keyManager) {
                this._updateNavigationDirection();
            }
        });

        effect(() => {
            const gridPosition = this._gridPosition();
            if (!gridPosition) {
                return;
            }

            const items = this._focusableItems();
            items.forEach((item, index) => {
                item._position = {
                    ...gridPosition,
                    colIndex: index,
                    totalCols: items.length
                };
            });
        });
    }

    /** @hidden */
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
    async _onFocus(): Promise<void> {
        const gridPosition = this._gridPosition();
        if (gridPosition) {
            this._gridListFocused$.next(gridPosition);

            this._liveAnnouncer.clear();
            await this._liveAnnouncer.announce(this.listFocusedEventAnnouncer()(gridPosition));

            this.setTabbable(true);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenOnItems();
    }

    /** Set items programmatically. */
    setItems(items: ReadonlyArray<FocusableItem>): void {
        this._itemsOverride.set(items);
        this._listenOnItems();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyManager?.destroy();
    }

    /** Set active item in list */
    setActiveItem(index: number, scrollPosition?: ScrollPosition): void {
        let availableIndex;

        const items = this._focusableItems();
        for (let itemIndex = index; itemIndex < items.length; itemIndex += 1) {
            const item = items[itemIndex];
            if (item && isItemFocusable(item)) {
                availableIndex = itemIndex;
                break;
            }
        }

        if (availableIndex != null) {
            scrollIntoView(getItemElement(items[availableIndex]), scrollPosition);
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
        this._tabbable.set(state);
    }

    /** @hidden */
    _updateNavigationDirection(): void {
        if (!this._keyManager) {
            return;
        }

        if (this.navigationDirection() === 'vertical') {
            this._keyManager = this._keyManager.withVerticalOrientation(true);
            this._keyManager = this._keyManager.withHorizontalOrientation(null);
        } else {
            this._keyManager = this._keyManager.withVerticalOrientation(false);
            this._keyManager = this._keyManager.withHorizontalOrientation(this.contentDirection() || 'ltr');
        }
    }

    /** @hidden */
    _setItemsTabbable(state: boolean): void {
        this._focusableItems().forEach((item) => item.setTabbable(state));
    }

    /** @hidden */
    _setGridPosition(position: FocusableListPosition): void {
        this._gridPosition.set(position);
    }

    /** @hidden */
    private _initializeFocusManager(items: ReadonlyArray<FocusableItem>, config: FocusableListConfig = {}): void {
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
                const directiveItem = this._focusableItems()[index];
                if (!directiveItem) {
                    return;
                }

                const gridPosition = this._gridPosition();
                if (gridPosition) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this._gridItemFocused$.next(directiveItem._position!);
                }

                const id = getItemElement(item)?.id ?? null;
                this.itemFocused.emit({ index, total: items.length, id });
                this._focusableItems().forEach((i) => i.setTabbable(i === directiveItem));
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
        if (this._itemsEffectInitialized) {
            return;
        }
        // Prevent creating duplicate effects
        this._itemsEffectInitialized = true;
        runInInjectionContext(this._injector, () => {
            effect(() => {
                const items = this._focusableItems();
                const navigationDirection = untracked(this.navigationDirection);
                const direction = navigationDirection === 'grid' ? 'horizontal' : navigationDirection;

                this._initializeFocusManager(items, {
                    direction,
                    contentDirection: untracked(this.contentDirection),
                    wrap: untracked(this.wrap)
                });
            });
        });
    }
}

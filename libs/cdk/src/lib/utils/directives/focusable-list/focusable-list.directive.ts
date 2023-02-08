import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    Output,
    QueryList,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { finalize, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FocusableItemDirective, FocusableItemPosition } from '../focusable-item/focusable-item.directive';
import { DestroyedService } from '../../services/destroyed.service';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableObserver } from '../focusable-item';
import { FDK_FOCUSABLE_LIST_DIRECTIVE } from './focusable-list.tokens';
import { fromEvent, merge, Subject } from 'rxjs';
import { Nullable } from '../../models/nullable';
import { FocusableOption, FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { getNativeElement } from '../../helpers';
import { HasElementRef } from '../../interfaces';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { intersectionObservable, KeyUtil } from '../../functions';
import { F2, TAB } from '@angular/cdk/keycodes';
import { scrollIntoView, ScrollPosition } from './scroll';

export interface FocusableListPosition {
    rowIndex: number;
    totalRows: number;
}

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

export type FocusableItem = FocusableOption & HasElementRef & { index: number; focusable: (() => boolean) | boolean };

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnFocusableList]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkFocusableList]', '[fnFocusableList]')
        }
    ]
})
export class DeprecatedFocusableListDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkFocusableList]',
    exportAs: 'fdkFocusableList',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: FocusableListDirective
        },
        DestroyedService
    ]
})
export class FocusableListDirective implements OnChanges, AfterViewInit {
    /** Whether the whole list should be focusable, handy in grids. */
    @Input()
    set focusable(value: BooleanInput) {
        this._focusable = coerceBooleanProperty(value);

        this.setTabbable(this._focusable);
    }
    get focusable(): boolean {
        return this._focusable;
    }

    /** @hidden */
    private _focusable = false;

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
    public readonly _focusableItems: QueryList<FocusableItemDirective>;

    /** @hidden */
    public readonly _gridItemFocused$ = new Subject<FocusableItemPosition>();

    /** @hidden */
    public readonly _gridListFocused$ = new Subject<FocusableListPosition>();

    /** @hidden */
    public readonly _keydown$ = new Subject<FocusableListKeydownEvent>();

    /** @hidden */
    private _gridPosition: { rowIndex: number; totalRows: number };

    /** @hidden */
    private _keyManager?: FocusKeyManager<FocusableItem>;

    /** @hidden */
    private _tabbable = false;

    /** @hidden */
    private readonly _refreshItems$ = new Subject<void>();

    /** @hidden */
    @HostBinding('attr.tabindex')
    get _tabindex(): number {
        return this._tabbable ? 0 : -1;
    }

    /** @hidden */
    _isVisible = false;

    /** @hidden */
    constructor(
        private _renderer: Renderer2,
        private _destroy$: DestroyedService,
        private _elementRef: ElementRef<HTMLElement>,
        private _liveAnnouncer: LiveAnnouncer,
        private _focusableObserver: FocusableObserver
    ) {
        intersectionObservable(this._elementRef.nativeElement, { threshold: 0.25 })
            .pipe(takeUntil(this._destroy$))
            .subscribe((isVisible) => (this._isVisible = isVisible[0]?.isIntersecting));

        this._focusableObserver
            .observe(this._elementRef, false)
            .pipe(takeUntil(this._destroy$))
            .subscribe((isFocusable) => {
                if (!isFocusable && isFocusable !== this.focusable) {
                    this.focusable = isFocusable;
                }
            });
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
        this._focusableItems.changes
            .pipe(
                startWith(this._focusableItems),
                map((queryList) => queryList.toArray()),
                tap((items: FocusableItemDirective[]): void => {
                    const focusableItems: FocusableItem[] = items.map((item, index) => ({
                        index,
                        focusable: () => item.fdkFocusableItem,
                        elementRef: () => item.elementRef(),
                        focus: () => item.elementRef().nativeElement.focus()
                    }));

                    const direction = this.navigationDirection === 'grid' ? 'horizontal' : this.navigationDirection;

                    this._initializeFocusManager(focusableItems, this, {
                        direction,
                        contentDirection: this.contentDirection,
                        wrap: this.wrap
                    });
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeydown(event: KeyboardEvent): void {
        // Already handled
        if (event.defaultPrevented) {
            return;
        }

        this._keydown$.next({ list: this, event, activeItemIndex: null });

        if (!KeyUtil.isKeyCode(event, F2) || !this.focusable) {
            return;
        }

        if (document.activeElement === this._elementRef.nativeElement) {
            this.setActiveItem(0);
        } else {
            this.focus();
        }
    }

    /** Set active item in list */
    setActiveItem(index: number, scrollPosition?: ScrollPosition): void {
        let availableIndex;

        this._focusableItems.find((item, itemIndex) => {
            if (itemIndex >= index && item.fdkFocusableItem) {
                availableIndex = itemIndex;
                return true;
            }

            return false;
        });

        if (availableIndex != null) {
            scrollIntoView(this._focusableItems.get(availableIndex)?.elementRef().nativeElement, scrollPosition);
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
            .pipe(startWith(this._focusableItems), takeUntil(this._destroy$))
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
    private _initializeFocusManager(
        items: FocusableItem[],
        list: FocusableListDirective,
        config: FocusableListConfig = {}
    ): void {
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

        keyManager.skipPredicate((item) => !(typeof item.focusable === 'boolean' ? item.focusable : item.focusable()));

        this._keyManager = keyManager;

        const events$ = items.map((item) => fromEvent<KeyboardEvent>(getNativeElement(item), 'keydown'));
        const focusListenerDestroyers = items.map((item, index) =>
            this._renderer.listen(getNativeElement(item), 'focus', () => {
                const directiveItem = this._focusableItems.get(index);
                if (!directiveItem) {
                    return;
                }

                if (this._gridPosition) {
                    this._gridItemFocused$.next(directiveItem._position);
                }

                this.itemFocused.next({ index: item.index, total: items.length });
                this._focusableItems.forEach((i) => i.setTabbable(i === directiveItem));
                this._keyManager?.setActiveItem(item.index);
            })
        );

        merge(...events$)
            .pipe(
                tap((event: KeyboardEvent) => {
                    this._keydown$.next({ list, event, activeItemIndex: this._keyManager?.activeItemIndex });

                    // Already handled
                    if (event.defaultPrevented) {
                        return;
                    }

                    // Prevent scrolling and other default actions
                    // But allow tabbing in/out and F2 to jump into list
                    if (!KeyUtil.isKeyCode(event, [TAB, F2])) {
                        event.preventDefault();
                    }

                    this._keyManager?.onKeydown(event);
                }),
                takeUntil(merge(this._refreshItems$, this._destroy$)),
                finalize(() => focusListenerDestroyers.forEach((d) => d()))
            )
            .subscribe();
    }

    /** @hidden */
    private _defaultListFocusedEventAnnouncer(position: FocusableListPosition): string {
        return `Row: ${position.rowIndex + 1} of ${position.totalRows}, use F2 button to dive in and focus list's item`;
    }
}

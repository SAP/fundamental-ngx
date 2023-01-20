import {
    AfterViewInit,
    ContentChildren,
    Directive,
    EventEmitter,
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
import { FDK_FOCUSABLE_ITEM_DIRECTIVE } from '../focusable-item';
import { FDK_FOCUSABLE_LIST_DIRECTIVE } from './focusable-list.tokens';
import { fromEvent, merge, Subject } from 'rxjs';
import { Nullable } from '../../models/nullable';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { getNativeElement } from '../../helpers';
import { HasElementRef } from '../../interfaces';

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

    /** Event emitted when item focused, contains item's position info. */
    @Output()
    readonly itemFocused = new EventEmitter<FocusableListItemFocusedEvent>();

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    public readonly _focusableItems: QueryList<FocusableItemDirective>;

    /** @hidden */
    public readonly _gridItemFocused$ = new Subject<FocusableItemPosition>();

    /** @hidden */
    public readonly _keydown$ = new Subject<FocusableListKeydownEvent>();

    /** @hidden */
    private _gridPosition: { rowIndex: number; totalRows: number };

    /** @hidden */
    private _keyManager?: FocusKeyManager<FocusableItem>;

    /** @hidden */
    private readonly _refreshItems$ = new Subject<void>();

    /** @hidden */
    constructor(private _renderer: Renderer2, private _destroy$: DestroyedService) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._keyManager) {
            return;
        }

        if (changes.wrap) {
            this._keyManager = this._keyManager.withWrap(changes.wrap.currentValue);
        }

        if (changes.contentDirection) {
            if (changes.contentDirection.currentValue === 'vertical') {
                this._keyManager = this._keyManager.withVerticalOrientation(true);
                this._keyManager = this._keyManager.withHorizontalOrientation(null);
            } else {
                this._keyManager = this._keyManager.withVerticalOrientation(false);
                this._keyManager = this._keyManager.withHorizontalOrientation(this.contentDirection || 'ltr');
            }
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

    /** Set active item in list */
    setActiveItem(index: number): void {
        if (this._focusableItems.get(index)?.fdkFocusableItem) {
            this._keyManager?.setActiveItem(index);
        }
    }

    /** @hidden */
    _setItemsTabbable(state: boolean): void {
        this._focusableItems.forEach((item) => item.setTabbable(state));
    }

    /** @hidden */
    _setGridPosition(position: { rowIndex: number; totalRows: number }): void {
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

        let keyManager = new FocusKeyManager<any>(items);

        if (config.wrap !== false) {
            keyManager = keyManager.withWrap();
        }

        if (config.direction === 'horizontal') {
            keyManager = keyManager.withHorizontalOrientation(config.contentDirection || 'ltr'); // should be replaced
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

                    if (event.defaultPrevented) {
                        return;
                    }

                    this._keyManager?.onKeydown(event);
                }),
                takeUntil(merge(this._refreshItems$, this._destroy$)),
                finalize(() => focusListenerDestroyers.forEach((d) => d()))
            )
            .subscribe();
    }
}

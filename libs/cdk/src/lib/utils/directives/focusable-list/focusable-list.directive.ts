import { AfterViewInit, ContentChildren, Directive, Input, QueryList, Renderer2 } from '@angular/core';
import { finalize, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FocusableItemDirective } from '../focusable-item/focusable-item.directive';
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
import { HasElementRef } from '../../interfaces';
import { getNativeElement } from '../../helpers';

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

export type FocusableItem = FocusableOption & HasElementRef & { focusable: (() => boolean) | boolean; index: number };

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
export class FocusableListDirective implements AfterViewInit {
    /** Direction of navigation. Always horizontal when in grid. */
    @Input()
    navigationDirection: 'horizontal' | 'vertical' = 'vertical';

    /** Direction of the content. */
    @Input()
    contentDirection: 'ltr' | 'rtl' | null = 'ltr';

    /**
     * Configures wrapping mode which determines whether the active item will wrap to the other end of list when there are no more items in the given direction.
     */
    @Input()
    wrap = false;

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    public readonly _focusableItems: QueryList<FocusableItemDirective>;

    /** @hidden */
    public readonly _itemFocused$ = new Subject<void>();

    /** @hidden */
    public readonly _keydown$ = new Subject<FocusableListKeydownEvent>();

    /** @hidden */
    private keyManager?: FocusKeyManager<FocusableItem>;

    /** @hidden */
    private _position: { row: number; totalRows: number };

    /** @hidden */
    private readonly _refreshItems$ = new Subject<void>();

    /** @hidden */
    constructor(private _renderer: Renderer2, private _destroy$: DestroyedService) {}

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

                    this._initializeFocusManager(focusableItems, this, {
                        direction: this.navigationDirection,
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
            this.keyManager?.setActiveItem(index);
        }
    }

    /** @hidden */
    _setItemsTabbable(state: boolean): void {
        this._focusableItems.forEach((item) => item.setTabbable(state));
    }

    /** @hidden */
    _setPosition(position: { row: number; totalRows: number }): void {
        this._position = position;

        this._focusableItems.changes
            .pipe(startWith(this._focusableItems), takeUntil(this._destroy$))
            .subscribe((items) =>
                items.forEach((item, index) =>
                    item._setPosition({ ...this._position, col: index, totalCols: this._focusableItems.length })
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
        }

        keyManager.skipPredicate((item) => !(typeof item.focusable === 'boolean' ? item.focusable : item.focusable()));

        this.keyManager = keyManager;

        const events$ = items.map((item) => fromEvent<KeyboardEvent>(getNativeElement(item), 'keydown'));
        const focusListenerDestroyers = items.map((item) =>
            this._renderer.listen(getNativeElement(item), 'focus', () => {
                this._itemFocused$.next();
                this._focusableItems.forEach((i) => i.setTabbable(i.elementRef() === item.elementRef()));
                this.keyManager?.setActiveItem(item.index);
            })
        );

        merge(...events$)
            .pipe(
                tap((event: KeyboardEvent) => {
                    this._keydown$.next({ list, event, activeItemIndex: this.keyManager?.activeItemIndex });

                    if (event.defaultPrevented) {
                        return;
                    }

                    this.keyManager?.onKeydown(event);
                }),
                takeUntil(merge(this._refreshItems$, this._destroy$)),
                finalize(() => focusListenerDestroyers.forEach((d) => d()))
            )
            .subscribe();
    }
}

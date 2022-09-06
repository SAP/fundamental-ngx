import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    ChangeDetectorRef,
    ContentChild,
    HostBinding,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
    TemplateRef,
    ViewChildren,
    AfterViewInit,
    OnDestroy,
    Input,
    OnInit
} from '@angular/core';
import { debounceTime, filter, fromEvent, startWith, Subject, Subscription } from 'rxjs';
import { intersectionObservable, KeyUtil } from '@fundamental-ngx/core/utils';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';
import { OverflowContainer } from './interfaces/overflow-container.interface';
import { OverflowExpand } from './interfaces/overflow-expand.interface';
import { OverflowLayoutFocusableItem } from './interfaces/overflow-focusable-item.interface';
import { OverflowItemRef } from './interfaces/overflow-item-ref.interface';
import { OverflowPopoverContent } from './interfaces/overflow-popover-content.interface';
import { OverflowLayoutConfig, OverflowLayoutService } from './overflow-layout.service';
import { FD_OVERFLOW_CONTAINER } from './tokens/overflow-container.token';
import { FD_OVERFLOW_EXPAND } from './tokens/overflow-expand.token';
import { FD_OVERFLOW_FOCUSABLE_ITEM } from './tokens/overflow-focusable-item.token';
import { FD_OVERFLOW_ITEM_REF } from './tokens/overflow-item-ref.token';

@Component({
    selector: 'fd-overflow-layout',
    templateUrl: './overflow-layout.component.html',
    styleUrls: ['./overflow-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_OVERFLOW_CONTAINER,
            useExisting: OverflowLayoutComponent
        },
        OverflowLayoutService
    ]
})
export class OverflowLayoutComponent implements OnInit, AfterViewInit, OnDestroy, OverflowContainer {
    /**
     * Maximum amount of visible items.
     */
    @Input()
    set maxVisibleItems(value: number) {
        if (value === this._maxVisibleItems) {
            return;
        }
        this._maxVisibleItems = value;
        this.triggerRecalculation();
    }

    get maxVisibleItems(): number {
        return this._maxVisibleItems;
    }

    /**
     * Keyboard event to listen for keyboard navigation through items.
     */
    @Input()
    navigationTrigger: 'keyup' | 'keydown' = 'keyup';

    /** Direction of the fitting items calculation. */
    @Input()
    showMorePosition: 'left' | 'right' = 'right';

    /** Whether to render hidden items in reverse order. */
    @Input()
    reverseHiddenItems = false;

    /** Whether to enable keyboard navigation. */
    @Input()
    enableKeyboardNavigation = true;

    /**
     * Event, triggered when amount of visible items has been changed.
     */
    @Output()
    visibleItemsCount = new EventEmitter<number>();

    /**
     * Event, triggered when amount of hidden items has been changed.
     */
    @Output()
    hiddenItemsCount = new EventEmitter<number>();

    /**
     * @hidden
     * List of items to display.
     */
    @ContentChildren(FD_OVERFLOW_ITEM_REF, { descendants: true })
    _items: QueryList<OverflowItemRef>;

    /**
     * @hidden
     * Template for the custom "More" button.
     */
    @ContentChild(FD_OVERFLOW_EXPAND)
    _moreButton: OverflowExpand;

    /**
     * @hidden
     * List of items that can be focused
     */
    @ContentChildren(FD_OVERFLOW_FOCUSABLE_ITEM, { descendants: true })
    _focusableOverflowItems: QueryList<OverflowLayoutFocusableItem>;

    /**
     * @hidden
     * List of rendered items.
     */
    @ViewChildren(OverflowLayoutItemContainerDirective)
    _visibleItems: QueryList<OverflowLayoutItemContainerDirective>;

    /**
     * @hidden
     * Items wrapper directive.
     */
    @ViewChild('itemsWrapper')
    _itemsWrapper: ElementRef<HTMLElement>;

    /**
     * @hidden
     * Layout container element.
     */
    @ViewChild('layoutContainer')
    _layoutContainer: ElementRef<HTMLDivElement>;

    /**
     * @hidden
     * "More" button container element.
     */
    @ViewChild('showMoreContainer')
    _showMoreContainer: ElementRef<HTMLDivElement>;

    /** @hidden */
    _allItems: OverflowItemRef[] = [];

    /** @hidden */
    _hiddenItems: OverflowItemRef[] = [];

    /** @hidden */
    _showMore = false;

    /** @hidden */
    @HostBinding('class')
    readonly _initialClass = 'fd-overflow-layout';

    /** @hidden */
    private readonly _subscription = new Subscription();

    /** @hidden */
    private _overflowPopoverContent: OverflowPopoverContent;

    /** @hidden */
    private _fillTrigger$ = new Subject<void>();

    /** @hidden */
    private _maxVisibleItems = Infinity;

    /** @hidden */
    private _canListenToResize = false;

    /** Overflow Layout more button text */
    @Input()
    moreItemsButtonText: (hiddenItemsCount: number) => string = (count) => `${count} more`;

    /** @hidden */
    private get _config(): OverflowLayoutConfig {
        return {
            visibleItems: this._visibleItems,
            items: this._items,
            focusableItems: this._focusableOverflowItems,
            itemsWrapper: this._itemsWrapper.nativeElement,
            showMoreContainer: this._showMoreContainer.nativeElement,
            layoutContainerElement: this._layoutContainer.nativeElement,
            maxVisibleItems: this.maxVisibleItems,
            direction: this.showMorePosition,
            enableKeyboardNavigation: this.enableKeyboardNavigation,
            reverseHiddenItems: this.reverseHiddenItems
        };
    }

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        protected _cdr: ChangeDetectorRef,
        protected _overflowLayoutService: OverflowLayoutService
    ) {
        this._subscription.add(
            this._fillTrigger$.pipe(debounceTime(30)).subscribe(() => {
                this._overflowLayoutService.setConfig(this._config);
                this._overflowLayoutService.fitVisibleItems();
            })
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this._setupKeyboardListener();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._subscription.add(
            this._overflowLayoutService.detectChanges.subscribe(() => {
                this._cdr.detectChanges();
            })
        );

        this._subscription.add(
            this._overflowLayoutService.onResult.subscribe((result) => {
                this._hiddenItems = result.hiddenItems;
                this._showMore = result.showMore;

                this.hiddenItemsCount.emit(result.hiddenItems.length);
                this.visibleItemsCount.emit(this._allItems.filter((i) => !i.hidden).length);

                this._cdr.detectChanges();
            })
        );

        this._subscription.add(
            this._items.changes.pipe(startWith(() => this._items)).subscribe(() => {
                this._allItems = this._items.toArray();

                this._cdr.detectChanges();
            })
        );

        this._subscription.add(
            intersectionObservable(this._elementRef.nativeElement).subscribe(() => {
                this._overflowLayoutService.startListening(this._config);

                this._canListenToResize = true;
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /**
     * Triggers layout recalculation of the items.
     */
    triggerRecalculation(): void {
        if (!this._canListenToResize) {
            return;
        }

        this._fillTrigger$.next();
    }

    /**
     * Sets current focused element.
     * @param element Element that needs to be focused.
     */
    setFocusedElement(element: OverflowLayoutFocusableItem): void {
        const index = this._focusableOverflowItems.toArray().findIndex((item) => item === element);

        if (index !== -1) {
            this._overflowLayoutService._keyboardEventsManager.setActiveItem(index);
        }
    }

    /**
     * Registers popover content directive for main component.
     * @param content {OverflowPopoverContent} directive
     */
    registerPopoverContent(content: OverflowPopoverContent): void {
        this._overflowPopoverContent = content;
    }

    /** @hidden */
    _itemsTrackFn(_: number, item: OverflowItemRef): TemplateRef<any> {
        return item.templateRef;
    }

    /** @hidden */
    _onPopoverStateChange(opened: boolean): void {
        if (opened) {
            this._overflowPopoverContent?.focusFirstTabbableElement();
        }
    }

    /** @hidden */
    private _setupKeyboardListener(): void {
        this._subscription.add(
            fromEvent<KeyboardEvent>(this._elementRef.nativeElement, this.navigationTrigger)
                .pipe(filter(() => this.enableKeyboardNavigation))
                .subscribe((event) => {
                    if (KeyUtil.isKeyCode(event, TAB)) {
                        const index = this._focusableOverflowItems
                            .toArray()
                            .findIndex((item) => item.focusable && item.elementRef.nativeElement === event.target);
                        if (index !== -1) {
                            this._overflowLayoutService._keyboardEventsManager.setActiveItem(index);
                        }
                    }

                    if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
                        event.preventDefault();

                        // passing the event to key manager so, we get a change fired
                        this._overflowLayoutService._keyboardEventsManager.onKeydown(event);
                    }
                })
        );
    }
}

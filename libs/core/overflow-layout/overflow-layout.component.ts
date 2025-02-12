import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    booleanAttribute
} from '@angular/core';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverBodyDirective, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Subject, Subscription, debounceTime, filter, first, fromEvent, startWith } from 'rxjs';
import { OverflowItemContainerRefDirective } from './directives/overflow-item-container-ref.directive';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';
import { OverflowLayoutPopoverContentDirective } from './directives/overflow-layout-popover-content.directive';
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
    styleUrl: './overflow-layout.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_OVERFLOW_CONTAINER,
            useExisting: OverflowLayoutComponent
        },
        OverflowLayoutService
    ],
    imports: [
        NgTemplateOutlet,
        OverflowLayoutItemContainerDirective,
        OverflowItemContainerRefDirective,
        PopoverComponent,
        PopoverControlComponent,
        ButtonComponent,
        PopoverBodyDirective,
        OverflowLayoutPopoverContentDirective,
        FdTranslatePipe
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

    /** Whether the show more button should be rendered */
    @Input({ transform: booleanAttribute })
    renderShowMoreButton = true;

    /** Whether to render hidden items in reverse order. */
    @Input()
    reverseHiddenItems = false;

    /** Whether to enable keyboard navigation. */
    @Input()
    enableKeyboardNavigation = true;

    /** Aria role of the overflow layout. */
    @Input()
    ariaRole: string;

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
     * Event, triggered when hidden items have been changed.
     */
    @Output()
    hiddenItemsChange = new EventEmitter<OverflowItemRef[]>();

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
    _moreButton: Nullable<OverflowExpand>;

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
    @HostBinding('class')
    readonly _initialClass = 'fd-overflow-layout';

    /** @hidden */
    _allItems: OverflowItemRef[] = [];

    /** @hidden */
    _hiddenItems: OverflowItemRef[] = [];

    /** @hidden */
    _showMore = false;

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

    /** @hidden */
    private _dir: 'rtl' | 'ltr' = 'ltr';

    /** @hidden */
    private _keyboardEventsManager: Nullable<FocusKeyManager<OverflowLayoutFocusableItem>>;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _ngZone: NgZone,
        protected _cdr: ChangeDetectorRef,
        protected _overflowLayoutService: OverflowLayoutService,
        @Optional() private readonly _rtl: RtlService
    ) {
        this._subscription.add(
            this._fillTrigger$.pipe(debounceTime(30)).subscribe(() => {
                this._overflowLayoutService.setConfig(this._config);
                this._overflowLayoutService.fitVisibleItems();
            })
        );
    }

    /** Overflow Layout more button text */
    @Input()
    moreItemsButtonText: (hiddenItemsCount: number) => string = (count) => `${count} more`;

    /** @hidden */
    private get _config(): OverflowLayoutConfig {
        return {
            visibleItems: this._visibleItems.toArray(),
            items: this._items.toArray(),
            focusableItems: this._focusableOverflowItems.toArray(),
            itemsWrapper: this._itemsWrapper.nativeElement,
            showMoreContainer: this._showMoreContainer?.nativeElement,
            layoutContainerElement: this._layoutContainer.nativeElement,
            maxVisibleItems: this.maxVisibleItems,
            direction: this.showMorePosition,
            enableKeyboardNavigation: this.enableKeyboardNavigation,
            reverseHiddenItems: this.reverseHiddenItems
        };
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

                this.hiddenItemsChange.emit(result.hiddenItems);
                this.hiddenItemsCount.emit(result.hiddenItems.length);
                this.visibleItemsCount.emit(this._allItems.filter((i) => !i.hidden).length);

                this._cdr.detectChanges();
            })
        );

        this._subscription.add(
            this._items.changes.pipe(startWith(() => this._items)).subscribe(() => {
                this._allItems = this._items.toArray();

                this._cdr.detectChanges();

                this._overflowLayoutService.setConfig(this._config);
                this._overflowLayoutService.fitVisibleItems();
            })
        );

        this._setFocusKeyManager();
        this._subscribeToRtl();

        // There might be cases when the elements are not rendered yet, but the component is initialized already.
        // It may happen when it's inside the components that are wrapping ng-content with ng-containers and so on.
        // IntersectionObserver is a good solution for this case, but it's hardly manageable when testing.
        this._ngZone.onStable.pipe(first()).subscribe(() => {
            this._overflowLayoutService.startListening(this._config);

            this._canListenToResize = true;
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._keyboardEventsManager?.destroy();
        this._keyboardEventsManager = null;
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
            this._keyboardEventsManager?.setActiveItem(index);
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
                            this._keyboardEventsManager?.setActiveItem(index);
                        }
                    }

                    if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
                        event.preventDefault();

                        // passing the event to key manager so, we get a change fired
                        this._keyboardEventsManager?.onKeydown(event);
                    }
                })
        );
    }

    /** @hidden */
    private _setFocusKeyManager(): void {
        if (!this.enableKeyboardNavigation) {
            return;
        }
        this._dir = this._rtl?.rtl.value ? 'rtl' : 'ltr';
        this._keyboardEventsManager?.destroy();
        this._keyboardEventsManager = new FocusKeyManager(this._focusableOverflowItems)
            .withWrap()
            .withHorizontalOrientation(this._dir)
            .withVerticalOrientation()
            .skipPredicate((item) => !item.navigable || item.hidden);
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtl || !this.enableKeyboardNavigation) {
            return;
        }

        this._subscription.add(
            this._rtl.rtl.subscribe((isRtl) => {
                this._dir = isRtl ? 'rtl' : 'ltr';

                this._keyboardEventsManager = this._keyboardEventsManager?.withHorizontalOrientation(this._dir);
            })
        );
    }
}

import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HasElementRef, KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { Observable, asyncScheduler, filter, observeOn, startWith, take } from 'rxjs';
import { NavigationListItemDirective } from '../../directives/navigation-list-item-ref.directive';
import { FdbNavigationContentContainer } from '../../models/navigation-content-container.class';
import { FdbNavigationItemLink } from '../../models/navigation-item-link.class';
import {
    FdbNavigationListItem,
    FdbNavigationListItemCmp,
    LIST_ITEM_CLASS
} from '../../models/navigation-list-item.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationLinkRefDirective } from '../navigation-link/navigation-link.component';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

let navListItemUniqueId = 0;

@Directive({
    selector: '[fdbNavigationListItemMarker]',
    standalone: true
})
export class NavigationListItemMarkerDirective implements HasElementRef {
    /** Element reference. */
    readonly elementRef = inject(ElementRef);
    /** @hidden */
    constructor() {
        inject(NavigationListItemComponent).marker = this;
    }
}

@Component({
    selector: 'fdb-navigation-list-item',
    imports: [
        NgTemplateOutlet,
        NavigationListComponent,
        PopoverComponent,
        PopoverBodyComponent,
        NavigationListItemMarkerDirective,
        NgClass
    ],
    templateUrl: './navigation-list-item.component.html',
    styles: [],
    providers: [
        NavigationService,
        {
            provide: FdbNavigationListItem,
            useExisting: NavigationListItemComponent
        },
        {
            provide: FdbNavigationListItemCmp,
            useExisting: NavigationListItemComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationListItemComponent extends FdbNavigationListItem implements AfterViewInit, OnDestroy {
    /** @hidden */
    @Input()
    set class(value: Nullable<string>) {
        this._class$.set(value);
    }

    get class(): Nullable<string> {
        return this._class$();
    }

    /** Whether the list item represents "Home" item. */
    @Input({ transform: booleanAttribute })
    set home(value: boolean) {
        this._home$.set(value);
    }

    get home(): boolean {
        return this._home$();
    }

    /** Whether the list item represents "Quick create" button. */
    @Input({ transform: booleanAttribute })
    set quickCreate(value: boolean) {
        this.quickCreate$.set(value);
    }

    get quickCreate(): boolean {
        return this.quickCreate$();
    }

    /** Whether the list item should be rendered as a separator */
    @Input({ transform: booleanAttribute })
    set separator(value: boolean) {
        this._separator$.set(value);
    }
    get separator(): boolean {
        return this._separator$();
    }

    /** Whether the list item should be rendered as a spacer */
    @Input({ transform: booleanAttribute })
    set spacer(value: boolean) {
        this._spacer$.set(value);
    }
    get spacer(): boolean {
        return this._spacer$();
    }

    /** Whether the list item should be rendered as a group. */
    @Input({ transform: booleanAttribute })
    set group(group: boolean) {
        this.isGroup$.set(group);
    }

    get group(): boolean {
        return this.isGroup$();
    }

    /** Whether the list item is expanded. */
    @Input({ transform: booleanAttribute })
    set expanded(expanded: boolean) {
        this.expanded$.set(expanded);
    }

    get expanded(): boolean {
        return this.expanded$();
    }

    /** Whether the item should be marked as selected. */
    @Input({ transform: booleanAttribute })
    set selected(selected: boolean) {
        this._manuallySelected$.set(selected);
    }

    get selected(): boolean {
        return this.selected$();
    }

    /** Whether the item is disabled. */
    @Input({ transform: booleanAttribute })
    set disabled(disabled: boolean) {
        this.disabled$.set(disabled);
    }

    get disabled(): boolean {
        return this.disabled$();
    }

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: false })
    listItems: QueryList<FdbNavigationListItem>;

    /** Link reference. */
    @ContentChild(FdbNavigationItemLink)
    set link(value: Nullable<FdbNavigationItemLink>) {
        this.link$.set(value);
    }

    /**
     * Link template reference.
     */
    @ContentChild(NavigationLinkRefDirective)
    linkRef: Nullable<NavigationLinkRefDirective>;

    /** Renderer template reference. */
    @ViewChild('renderer')
    set renderer(renderer: TemplateRef<any> | undefined) {
        this._onZoneStable().subscribe(() => {
            this.renderer$.set(renderer || null);
        });
    }

    /** ID for the navigation list item. Default one is assigned if not provided. */
    id = input(`fdb-nav-list-item-${++navListItemUniqueId}`);

    /** Type of the list item. Whether its a standard item or a "show more" button container. */
    readonly type: 'item' | 'showMore' = 'item';

    /** @hidden */
    readonly _toggleIcon$ = computed(() => {
        if (this.expandedAttr$()) {
            return 'slim-arrow-down';
        }
        return this._rtl$() ? 'slim-arrow-left' : 'slim-arrow-right';
    });

    /** List item placement container. */
    readonly placementContainer =
        inject(FdbNavigationContentContainer, {
            skipSelf: true,
            optional: true
        }) || undefined;

    /**
     * Whether the list item is visible in the main navigation list container.
     */
    readonly isVisible$ = computed(() => {
        if (this.isOverflow$()) {
            return false;
        }

        if (!this.parentListItem) {
            return this.isGroup$() ? !this.navigation.isSnapped$() : true;
        }

        if (this.navigation.isSnapped$()) {
            return this.normalizedLevel$() < 3;
        }

        return this.parentListItem.isVisible$() && this.parentListItem.expanded$();
    });

    /** Whether the item is disabled. Cached to avoid repeated signal calls. */
    readonly _isDisabledCached$ = computed(() => this.disabled$());

    /**
     * Whether the item is navigatable via the keyboard.
     */
    get skipNavigation(): boolean {
        return this.spacer || this.separator || this._isDisabledCached$();
    }

    /** aria-expanded attribute value. */
    readonly expandedAttr$ = computed(() =>
        this.navigation.isSnapped$() ? this.popoverOpen$() && !this.isOverflow$() : this.expanded$()
    );

    /** Role attribute value based on navigation state. */
    readonly roleAttr$ = computed(() => {
        if (this.navigation.isSnapped$()) {
            // In popover context (when parent list item exists), child items should be treeitem
            if (this.parentListItem && this.parentListItem.popoverOpen$()) {
                return 'treeitem';
            }
            // In overflow menu context (More button popover), items should be menuitem
            if (this.isOverflow$()) {
                return 'menuitem';
            }
            return 'menuitemradio';
        }
        return 'treeitem';
    });

    /** aria-checked attribute value for menuitemradio role. */
    readonly ariaCheckedAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && this.roleAttr$() === 'menuitemradio') {
            return this.isActiveAttr$();
        }
        return undefined;
    });

    /** aria-selected attribute value - kept in both expanded and snapped modes. */
    readonly ariaSelectedAttr$ = computed(() => this.isActiveAttr$());

    /** aria-level attribute value - only for treeitem role. */
    readonly ariaLevelAttr$ = computed(() => {
        if (!this.navigation.isSnapped$()) {
            return this.level$();
        }
        return undefined;
    });

    /** aria-owns attribute value for items with children. */
    readonly ariaOwnsAttr$ = computed(() => {
        if (this.hasChildren$()) {
            return `${this.id()}-list`;
        }
        return undefined;
    });

    /** ID attribute for child lists. */
    readonly childListIdAttr$ = computed(() => {
        if (this.hasChildren$()) {
            return `${this.id()}-list`;
        }
        return undefined;
    });

    /** aria-label attribute value for snapped mode menuitemradio. */
    readonly ariaLabelAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && this.roleAttr$() === 'menuitemradio') {
            const link = this.link$();
            if (link?.elementRef?.nativeElement) {
                const textElement = link.elementRef.nativeElement.querySelector('.fd-navigation__text');
                if (textElement) {
                    return textElement.textContent?.trim() || undefined;
                }
            }
        }
        return undefined;
    });

    /** aria-haspopup attribute value for snapped mode items with children. */
    readonly ariaHasPopupAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && this.hasChildren$()) {
            // In overflow menu, items with submenus should have aria-haspopup="menu"
            if (this.isOverflow$()) {
                return 'menu';
            }
            // Regular navigation items should have aria-haspopup="dialog"
            return 'dialog';
        }
        return undefined;
    });

    /** aria-current attribute value for snapped mode items with children. */
    readonly ariaCurrentAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && this.hasChildren$()) {
            return 'page';
        }
        return undefined;
    });

    /** Wrapper role attribute for snapped mode popovers. */
    readonly wrapperRoleAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && this.hasChildren$() && !this.isOverflow$()) {
            return 'tree';
        }
        return undefined;
    });

    /** Wrapper aria-roledescription for snapped mode popovers. */
    readonly wrapperAriaRoleDescriptionAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && this.hasChildren$() && !this.isOverflow$()) {
            return 'Navigation List Tree';
        }
        return undefined;
    });

    /** Title item role for snapped mode - should be treeitem in popovers. */
    readonly titleItemRoleAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && !this.isOverflow$()) {
            return 'treeitem';
        }
        return this.roleAttr$();
    });

    /** Title item aria-selected for snapped mode - should not be selected if children are selected. */
    readonly titleItemAriaSelectedAttr$ = computed(() => {
        if (this.navigation.isSnapped$() && !this.isOverflow$()) {
            // In popover, if any child is selected, the parent should not have aria-selected
            const hasSelectedChild = this.listItems$().some((item) => item?.isActiveAttr$());
            if (hasSelectedChild) {
                return false;
            }
            // Otherwise use the normal selected state
            return this.ariaSelectedAttr$();
        }
        return this.ariaSelectedAttr$();
    });
    readonly titleItemFocusable$ = computed(() => {
        if (this.navigation.isSnapped$() && !this.isOverflow$()) {
            // Check if the parent item has the with-expander class (two-click area)
            const parentItemElement = this.marker?.elementRef?.nativeElement;
            if (parentItemElement) {
                return parentItemElement.classList.contains('fd-navigation__item--with-expander');
            }
            return false; // Default to not focusable for one-click areas
        }
        return true;
    });

    /** CSS Class signal. */
    readonly class$ = computed(() =>
        [
            LIST_ITEM_CLASS,
            this._class$(),
            this._separator$() ? `${LIST_ITEM_CLASS}--separator` : '',
            this._spacer$() ? `${LIST_ITEM_CLASS}--spacer` : '',
            this._home$() ? `${LIST_ITEM_CLASS}--home` : ''
        ]
            .filter((k) => !!k)
            .join(' ')
    );

    /** Combined selected state - considers both manual selection and service selection. */
    readonly selected$ = computed(() => {
        // In router mode, only consider manual selection
        if (this.navigation.selectionMode === 'router') {
            return this._manuallySelected$();
        }

        // In click mode, check both manual selection and service selection
        // But manual selection should only be considered if no item is selected via service
        if (this.navigation.selectionMode === 'click') {
            const serviceSelected = this.navigation.service.selectedItem$() === this;
            const manuallySelected = this._manuallySelected$() && this.navigation.service.selectedItem$() === null;

            return serviceSelected || manuallySelected;
        }

        return false;
    });

    /** @hidden */
    readonly quickCreate$ = signal(false);

    /**
     * @hidden
     * Popover position. Changes based on rtl value.
     */
    readonly _popoverPlacement$ = computed<Placement>(() => (this._rtl$() ? 'left-start' : 'right-start'));

    /** @hidden */
    readonly _moreButtonRef$ = computed(() => this._parentNavigationList?.moreButtonRef || null);

    /** Optional parent list component. */
    readonly parentListItemComponent = inject(FdbNavigationListItemCmp, {
        optional: true,
        skipSelf: true
    });

    /** @hidden */
    get parentListItem(): FdbNavigationListItem | null {
        return (
            this._parentNavigationListItemDirective?.parentNavListItemDirective?._item || this.parentListItemComponent
        );
    }

    /** @hidden */
    private readonly _home$ = signal(false);

    /** Manual selection state signal (for router-based selection mode). */
    private readonly _manuallySelected$ = signal(false);

    /** @hidden */
    private readonly _class$ = signal<Nullable<string>>(null);

    /** @hidden */
    private readonly _separator$ = signal(false);

    /** @hidden */
    private readonly _spacer$ = signal(false);

    /** @hidden */
    private readonly _links: FdbNavigationItemLink[] = [];

    /** @hidden */
    private readonly _childLists: NavigationListComponent[] = [];

    /** @hidden */
    private _keyManager: Nullable<FocusKeyManager<FdbNavigationListItem>>;

    /** @hidden */
    private readonly _zone = inject(NgZone);

    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _rtl$ = computed<boolean>(() => !!this._rtlService?.rtlSignal());

    /**
     * @hidden
     * Directive that used during data-driven rendering.
     */
    private readonly _parentNavigationListItemDirective = inject(NavigationListItemDirective, { optional: true });

    /** @hidden */
    private readonly _parentNavigationService = inject(NavigationService, {
        skipSelf: true,
        optional: true
    });

    /** @hidden */
    private readonly _parentNavigationList = inject(NavigationListComponent, {
        skipSelf: true,
        optional: true
    });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        super();
        effect(() => {
            if (this.popoverOpen$()) {
                const listItems = this.listItems$().filter(Boolean) as FdbNavigationListItem[];
                this._keyManager = new FocusKeyManager(listItems)
                    .withVerticalOrientation()
                    .skipPredicate((item) => item.skipNavigation);
            } else {
                this._keyManager?.destroy();
            }
        });

        // We need to track child directives change and set list items based on that.
        effect(() => {
            if (!this._parentNavigationListItemDirective?.childDirectives()) {
                return;
            }

            const children = this._parentNavigationListItemDirective.childDirectives();
            const mappedItems = Array.from(children).map((child) => child._item);

            this.listItems$.set(mappedItems);
        });

        this._parentNavigationListItemDirective?.registerItem(this);

        this.navigation.closeAllPopups.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.popoverOpen$.set(false);
        });

        // Listen for selection changes to implement single-selection behavior
        this.navigation.service.selectionChanged$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((selectedItem) => {
                // If another item was selected and we're in click mode, clear our manual selection
                if (this.navigation.selectionMode === 'click' && selectedItem !== this && this._manuallySelected$()) {
                    this._manuallySelected$.set(false);
                }
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyManager?.destroy();
    }

    /** @hidden */
    _focusBeforeList(): void {
        if (this.popoverOpen$()) {
            this._focusPopoverLink();
        }
    }

    /**
     * @hidden
     * When item is focused, we notify list container about it to update active index in FocusKeyManager.
     */
    _focusInHandler(): void {
        if (!this.parentListItem?.popoverOpen$() && !this.isOverflow$()) {
            this.navigation.setActiveItem(this);
            return;
        }
        this._parentNavigationService?.currentItem$.next(this);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.listItems.changes
            .pipe(
                filter(() => !this._parentNavigationListItemDirective),
                startWith(null),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this.listItems$.set(this.listItems.toArray());
            });
    }

    /** @hidden */
    registerLink(link: FdbNavigationItemLink): void {
        if (this._links.indexOf(link) === -1) {
            this._links.push(link);
        }
    }

    /** @hidden */
    unregisterLink(link: FdbNavigationItemLink): void {
        this._links.splice(this._links.indexOf(link), 1);
    }

    /** @hidden */
    registerChildList(list: NavigationListComponent): void {
        if (this._childLists.includes(list)) {
            return;
        }
        this._childLists.push(list);
    }

    /** @hidden */
    unregisterChildList(list: NavigationListComponent): void {
        if (!this._childLists.includes(list)) {
            return;
        }
        this._childLists.splice(this._childLists.indexOf(list), 1);
    }

    /** @hidden */
    handleHorizontalNavigation(isExpand: boolean): void {
        console.log(isExpand);
    }

    /**
     * Callback method when Arrow down is pressed on the link in popover.
     */
    popoverLinkArrowDown(): void {
        this._keyManager?.setActiveItem(0);
    }

    /** @Hidden */
    _innerListKeydown(event: KeyboardEvent): void {
        if (!this.popoverOpen$()) {
            return;
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW) && this._keyManager?.activeItemIndex === 0) {
            this._focusPopoverLink();
            return;
        }

        if (KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            this._keyManager?.onKeydown(event);
            return;
        }

        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        const isGoBack = KeyUtil.isKeyCode(event, this._rtl$() ? LEFT_ARROW : RIGHT_ARROW);

        if (!isGoBack) {
            return;
        }

        this._snappedItemKeyboardExpandedHandler(false);
    }

    /** Toggles expanded state of the item. */
    toggleExpanded(): void {
        if (this.disabled$()) {
            return;
        }

        if (!this.hasChildren$()) {
            return;
        }
        this.expanded$.update((expanded) => !expanded);
    }

    /** Handles item click for both selection and expansion based on item type and navigation mode. */
    handleItemClick(): void {
        if (this.disabled$()) {
            return;
        }

        // Let the navigation link handle expansion for items with links
        // Only handle expansion here for items without any links
        if (this.hasChildren$() && !this.link$()) {
            this.toggleExpanded();
            return;
        }

        // Handle selection in click mode for selectable items
        if (this.navigation.selectionMode === 'click' && this.canItemBeSelected()) {
            this.navigation.service.setSelectedItem(this);
        }
    }

    /** Handles keydown events for navigation item actions. */
    handleItemKeydown(event: KeyboardEvent): void {
        // For quick create items, execute the click action on Enter/Space
        if (this.quickCreate$() && KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            event.preventDefault();
            event.stopPropagation();

            // Trigger click on the link element if it exists
            const linkElement = this.link$()?.elementRef?.nativeElement;
            if (linkElement) {
                linkElement.click();
            }
        }
    }

    /** Callback method when user used keyboard arrows to expand/collapse list item. */
    keyboardExpanded(shouldExpand: boolean): void {
        if (this.isOverflow$()) {
            this._overflowItemKeyboardExpandedHandler(shouldExpand);
        } else if (this.navigation.isSnapped$()) {
            this._snappedItemKeyboardExpandedHandler(shouldExpand);
        } else {
            this._visibleItemKeyboardExpandedHandler(shouldExpand);
        }
    }

    /**
     * Focus method implementation.
     * Used by main navigation component FocusKeyManager.
     * @param origin
     */
    focus(): void {
        // If popover is open, focus will be automatically shifted to cloned link.
        if (this.popoverOpen$() && !this.isOverflow$()) {
            return;
        }
        this.focusLink();
    }

    /**
     * Focuses inner link element.
     * Optionally closes the popover.
     */
    focusLink(closePopover = false): void {
        this.link$()?.elementRef.nativeElement.focus();

        if (closePopover) {
            this.popoverOpen$.set(false);
        }
    }

    /** @hidden */
    _onPopoverOpen(isOpen: boolean, popover: PopoverComponent): void {
        this.popoverOpen$.set(isOpen);
        if (isOpen) {
            this._onZoneStable().subscribe(() => {
                popover.popoverBody._focusFirstTabbableElement(true);
            });
        } else {
            // When popover closes, return focus to the parent link (for snapped state)
            if (this.navigation.isSnapped$()) {
                this._onZoneStable().subscribe(() => {
                    this.focusLink();
                });
            }
        }
    }

    /**
     * Determines if this item can be selected based on its type and structure.
     * @returns true if the item can be selected, false otherwise
     */
    canItemBeSelected(): boolean {
        // Group items (headers) cannot be selected
        if (this.isGroup$()) {
            return false;
        }

        // Quick create items cannot be selected (they execute actions instead)
        if (this.quickCreate$()) {
            return false;
        }

        // Items with children that don't have a router link cannot be selected
        // (they should only expand/collapse)
        if (this.hasChildren$() && !this.link$()?.routerLink) {
            return false;
        }

        // Separator and spacer items cannot be selected
        if (this.separator || this.spacer) {
            return false;
        }

        // All other items (leaf items and items with both links and children) can be selected
        return true;
    }

    private _focusPopoverLink(): void {
        this._links.find((link) => link.inPopover)?.elementRef.nativeElement.focus();
    }

    /** @hidden */
    private _visibleItemKeyboardExpandedHandler(shouldExpand: boolean): void {
        if (!this.hasChildren$()) {
            if (!shouldExpand) {
                this.parentListItem?.focus();
            }
            return;
        }

        if (!shouldExpand) {
            // If item already collapsed, shift focus to parent link
            if (!this.expanded$()) {
                this.parentListItem?.focus();
                return;
            }
            this.expanded$.set(false);
        } else {
            if (this.expanded$()) {
                this.listItems.first?.focus();
                return;
            }
            this.expanded$.set(true);
        }
    }

    /** @hidden */
    private _snappedItemKeyboardExpandedHandler(shouldExpand: boolean): void {
        if (!this.hasChildren$()) {
            return;
        }
        if (shouldExpand && !this.popoverOpen$()) {
            this.popoverOpen$.set(true);
        }
        if (!shouldExpand && this.popoverOpen$()) {
            this.popoverOpen$.set(false);
            this.link$()?.elementRef.nativeElement.focus();
        }
    }

    /**
     * @hidden
     * Method used to handle keyboard navigation for list item that is inside overflow container.
     */
    private _overflowItemKeyboardExpandedHandler(shouldExpand: boolean): void {
        if (shouldExpand && this._childLists.length > 0) {
            const firstList = this._childLists[0];
            firstList.setActiveItemIndex(0);
        }
        if (shouldExpand && !this.popoverOpen$()) {
            this.popoverOpen$.set(true);
        }
        if (!shouldExpand && this.popoverOpen$()) {
            this.popoverOpen$.set(false);
            this.link?.elementRef.nativeElement.focus();
        }
    }

    /** @hidden */
    private _onZoneStable(): Observable<void> {
        return this._zone.onStable.pipe(
            startWith(this._zone.isStable),
            observeOn(asyncScheduler),
            take(1),
            takeUntilDestroyed(this._destroyRef)
        );
    }
}

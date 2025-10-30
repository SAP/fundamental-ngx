import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
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
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NestedButtonDirective } from '@fundamental-ngx/btp/button';
import { HasElementRef, KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
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
import { NavigationFocusManager } from '../../utils/focus-manager.util';
import { NavigationKeyboardUtil } from '../../utils/keyboard.util';
import { NavigationLinkRefDirective } from '../navigation-link/navigation-link.component';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

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
        IconComponent,
        ButtonComponent,
        NestedButtonDirective,
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
        this.selected$.set(selected);
    }

    get selected(): boolean {
        return this.selected$();
    }

    /** Whether the item should be disabled. */
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

    /**
     * Whether the item is navigatable via the keyboard.
     */
    get skipNavigation(): boolean {
        return this.spacer || this.separator;
    }

    /** aria-expanded attribute value. */
    readonly expandedAttr$ = computed(() =>
        this.navigation.isSnapped$() ? this.popoverOpen$() && !this.isOverflow$() : this.expanded$()
    );

    /** CSS Class signal. */
    readonly class$ = computed(() => {
        const classes = [LIST_ITEM_CLASS];

        const customClass = this._class$();
        if (customClass) {
            classes.push(customClass);
        }

        if (this._separator$()) {
            classes.push(`${LIST_ITEM_CLASS}--separator`);
        }

        if (this._spacer$()) {
            classes.push(`${LIST_ITEM_CLASS}--spacer`);
        }

        if (this._home$()) {
            classes.push(`${LIST_ITEM_CLASS}--home`);
        }

        if (this.disabled$()) {
            classes.push(`${LIST_ITEM_CLASS}--disabled`);
        }

        return classes.join(' ');
    });

    /** Selected Signal. */
    readonly selected$ = signal(false);

    /** @hidden */
    readonly quickCreate$ = signal(false);

    /**
     * @hidden
     * Popover position. Changes based on rtl value.
     */
    readonly _popoverPlacement$ = computed<Placement>(() => (this._rtl$() ? 'left-start' : 'right-start'));

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
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        super();
        effect(() => {
            if (this.popoverOpen$()) {
                const listItems = this.listItems$().filter(Boolean) as FdbNavigationListItem[];
                this._keyManager = new FocusKeyManager(listItems)
                    .withVerticalOrientation()
                    .skipPredicate((item) => item.skipNavigation || item.disabled);
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
    handleHorizontalNavigation(): void {
        // Handle horizontal navigation logic here if needed
    }

    /**
     * Callback method when Arrow down is pressed on the link in popover.
     */
    popoverLinkArrowDown(): void {
        this._keyManager?.setActiveItem(0);
    }

    /** Toggles expanded state of the item. */
    toggleExpanded(): void {
        if (!this.hasChildren$()) {
            return;
        }
        this.expanded$.update((expanded) => !expanded);
    }

    /** Callback method when user used keyboard arrows to expand/collapse list item. */
    keyboardExpanded(shouldExpand: boolean): void {
        const strategy = NavigationFocusManager.getFocusStrategy(this.isOverflow$(), this.navigation.isSnapped$());

        const context = {
            hasChildren: this.hasChildren$(),
            expanded: this.expanded$(),
            popoverOpen: this.popoverOpen$(),
            parentListItem: this.parentListItem,
            listItems: this.listItems.toArray(),
            setExpanded: (expanded: boolean) => this.expanded$.set(expanded),
            setPopoverOpen: (open: boolean) => this.popoverOpen$.set(open),
            focus: () => this.focus(),
            focusFirstChild: () => this.listItems.first?.focus(),
            focusLink: () => this.link$()?.elementRef.nativeElement.focus()
        };

        NavigationFocusManager.handleKeyboardExpansion(strategy, shouldExpand, context);
    }

    /**
     * Focus method implementation.
     * Used by main navigation component FocusKeyManager.
     * @param origin
     */
    focus(): void {
        // Don't focus disabled items
        if (this.disabled) {
            return;
        }

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

        const isGoBack = KeyUtil.isKeyCode(event, this._rtl$() ? RIGHT_ARROW : LEFT_ARROW);

        if (!isGoBack) {
            return;
        }

        // Handle closing popover in snapped mode
        this.popoverOpen$.set(false);
        this.link$()?.elementRef.nativeElement.focus();
    }

    /**
     * @hidden
     * Handle keyboard events for expand/collapse functionality
     */
    _keydownHandler(event: KeyboardEvent): void {
        NavigationKeyboardUtil.handleNavigationKeys(
            event,
            this.hasChildren$(),
            this.expanded$(),
            () => this.keyboardExpanded(true),
            () => this.keyboardExpanded(false)
        );
    }

    /** @hidden */
    _onPopoverOpen(isOpen: boolean, popover: PopoverComponent): void {
        this.popoverOpen$.set(isOpen);
        if (!isOpen) {
            return;
        }

        this._onZoneStable().subscribe(() => {
            popover.popoverBody._focusFirstTabbableElement(true);
        });
    }

    private _focusPopoverLink(): void {
        this._links.find((link) => link.inPopover)?.elementRef.nativeElement.focus();
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

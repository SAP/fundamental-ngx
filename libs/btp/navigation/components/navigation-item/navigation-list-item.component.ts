import { FocusKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
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
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NestedButtonDirective } from '@fundamental-ngx/btp/button';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { Observable, asyncScheduler, filter, observeOn, of, startWith, take } from 'rxjs';
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

@Directive({
    selector: '[fdbNavigationListItemMarker]',
    standalone: true
})
export class NavigationListItemMarkerDirective {
    /** Element reference. */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    /** @hidden */
    constructor() {
        inject(NavigationListItemComponent).marker = this;
    }
}

@Component({
    selector: 'fdb-navigation-list-item',
    standalone: true,
    imports: [
        CommonModule,
        NgTemplateOutlet,
        NavigationListComponent,
        PopoverComponent,
        PopoverControlComponent,
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
    @Input({ transform: coerceBooleanProperty })
    set home(value: boolean) {
        this._home$.set(value);
    }

    get home(): boolean {
        return this._home$();
    }

    /** Whether the list item should be rendered as a separator */
    @Input({ transform: coerceBooleanProperty })
    set separator(value: boolean) {
        this._separator$.set(value);
    }
    get separator(): boolean {
        return this._separator$();
    }

    /** Whether the list item should be rendered as a spacer */
    @Input({ transform: coerceBooleanProperty })
    set spacer(value: boolean) {
        this._spacer$.set(value);
    }
    get spacer(): boolean {
        return this._spacer$();
    }

    /** Whether the list item should be rendered as a group. */
    @Input({ transform: coerceBooleanProperty })
    set group(group: boolean) {
        this.isGroup$.set(group);
    }

    get group(): boolean {
        return this.isGroup$();
    }

    /** Whether the list item is expanded. */
    @Input({ transform: coerceBooleanProperty })
    set expanded(expanded: boolean) {
        this.expanded$.set(expanded);
    }

    get expanded(): boolean {
        return this.expanded$();
    }

    /** Whether the item should be marked as selected. */
    @Input({ transform: coerceBooleanProperty })
    set selected(selected: boolean) {
        this.selected$.set(selected);
    }

    get selected(): boolean {
        return this.selected$();
    }

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: false })
    listItems: QueryList<FdbNavigationListItem>;

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
        if (this.navigation.horizontal$()) {
            return 'megamenu';
        }
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

    /** Selected Signal. */
    readonly selected$ = signal(false);

    /**
     * @hidden
     * Popover position. Changes based on rtl value.
     */
    readonly _popoverPlacement$ = computed<Placement>(() =>
        this.navigation.horizontal$() ? 'bottom-start' : this._rtl$() ? 'left-start' : 'right-start'
    );

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
    private _keyManager: Nullable<FocusKeyManager<FdbNavigationListItem>>;

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    private readonly _rtl$ = toSignal(
        inject(RtlService, {
            optional: true
        })?.rtl || of(false)
    );

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
    private readonly _navigationService = inject(NavigationService);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        super();
        effect(() => {
            if (this.popoverOpen$()) {
                this._keyManager?.destroy();
                this._keyManager = new FocusKeyManager(this.listItems$())
                    .withVerticalOrientation()
                    .skipPredicate((item) => item.skipNavigation);
            } else {
                this._keyManager?.destroy();
            }
        });

        // We need to track child directives change and set list items based on that.
        effect(
            () => {
                if (!this._parentNavigationListItemDirective?.childDirectives()) {
                    return;
                }

                const children = this._parentNavigationListItemDirective.childDirectives();
                const mappedItems = Array.from(children).map((child) => child._item!);

                this.listItems$.set(mappedItems);
            },
            {
                allowSignalWrites: true
            }
        );

        this._parentNavigationListItemDirective?.registerItem(this);

        this.navigation.closeAllPopups.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.popoverOpen$.set(false);
        });

        this._navigationService.closePopoverExcept$
            .pipe(
                filter((item) => item !== this),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this.popoverOpen$.set(false);
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyManager?.destroy();
    }

    /** @hidden */
    _focusBeforeList(event: KeyboardEvent): void {
        event.preventDefault();
        // Ignore when in horizontal mode.
        if (!this.popoverOpen$() || this.navigation.horizontal$()) {
            return;
        }
        this._focusPopoverLink();
    }

    /** @hidden */
    _closePopoverWithEsc(): void {
        this.popoverOpen$.set(false);
        this.link$()?.focus();
    }

    /**
     * @hidden
     * When item is focused, we notify list container about it to update active index in FocusKeyManager.
     */
    _focusInHandler(): void {
        if (!this.parentListItem?.popoverOpen$() && !this.isOverflow$()) {
            this._navigationService.setRootActiveItem(this);
            return;
        }
        if (this.navigation.horizontal$()) {
            this._navigationService.setActiveOverflowItem(this);
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

        this.link$.set(this._links[0]);
    }

    /** @hidden */
    unregisterLink(link: FdbNavigationItemLink): void {
        this._links.splice(this._links.indexOf(link), 1);
        this.link$.set(this._links[0]);
    }

    /** @hidden */
    registerChildList(list: NavigationListComponent): void {
        if (this.childLists.includes(list)) {
            return;
        }
        this.childLists.push(list);
    }

    /** @hidden */
    unregisterChildList(list: NavigationListComponent): void {
        if (!this.childLists.includes(list)) {
            return;
        }
        this.childLists.splice(this.childLists.indexOf(list), 1);
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

    /**
     * Focus method implementation.
     * Used by main navigation component FocusKeyManager.
     * @param origin
     */
    focus(): void {
        // If popover is open, focus will be automatically shifted to cloned link.
        if (!this.navigation.horizontal$() && this.popoverOpen$() && !this.isOverflow$()) {
            return;
        }
        this.focusLink();
    }

    /**
     * Focuses inner link element.
     * Optionally closes the popover.
     */
    focusLink(closePopover = false): void {
        this.link$()?.focus();

        if (closePopover) {
            this.popoverOpen$.set(false);
        }
    }

    /** @hidden */
    _itemMarkerKeydown(event: KeyboardEvent): void {
        if (!this.navigation.horizontal$()) {
            return;
        }

        if (this.isOverflow$()) {
            this._handleArrowNavInPopover(event);
        }

        this._navigationService.handleArrowNavOnRoot(event, this);
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

    /** @hidden */
    private _handleArrowNavInPopover(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [RIGHT_ARROW, LEFT_ARROW])) {
            return;
        }

        const isExpand = KeyUtil.isKeyCode(event, this._rtl$() ? RIGHT_ARROW : LEFT_ARROW);

        if (isExpand && this.hasChildren$()) {
            this.firstChildList?.setActiveItemIndex(0);
        }

        if (!isExpand && this.parentListItemComponent) {
            this.parentListItemComponent.focus();
        }
    }

    /** @hidden */
    private _focusPopoverLink(): void {
        this._links.find((link) => link.inPopover)?.focus();
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

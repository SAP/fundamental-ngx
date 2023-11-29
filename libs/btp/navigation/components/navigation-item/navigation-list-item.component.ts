import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    Input,
    NgZone,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { NestedButtonDirective } from '@fundamental-ngx/btp/button';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { asyncScheduler, observeOn, startWith, take } from 'rxjs';
import { FdbNavigationContentContainer } from '../../models/navigation-content-container.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationLinkComponent, NavigationLinkRefDirective } from '../navigation-link/navigation-link.component';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

@Directive({
    selector: '[fdbNavigationListItemMarker]',
    standalone: true
})
export class NavigationListItemMarkerDirective {
    /** Element reference. */
    readonly elementRef = inject(ElementRef);
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
        NestedButtonDirective
    ],
    templateUrl: './navigation-list-item.component.html',
    styles: [],
    providers: [
        NavigationService,
        {
            provide: FdbNavigationListItem,
            useExisting: NavigationListItemComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationListItemComponent extends FdbNavigationListItem implements AfterViewInit {
    /** @hidden */
    @Input()
    class: Nullable<string>;

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

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: false })
    listItems: QueryList<FdbNavigationListItem>;

    /** Link reference. */
    @ContentChild(NavigationLinkComponent)
    set link(value: Nullable<NavigationLinkComponent>) {
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
        this._zone.onStable.pipe(startWith(this._zone.isStable), take(1)).subscribe(() => {
            this.renderer$.set(renderer || null);
        });
    }

    /** Type of the list item. Whether its a standard item or a "show more" button container. */
    readonly type: 'item' | 'showMore' = 'item';

    /**
     * Whether the item is in overflow menu.
     */
    readonly isOverflow$ = signal(false);

    /** @hidden */
    readonly _toggleIcon$ = computed(() => {
        if (this.expandedAttr$()) {
            return 'slim-arrow-down';
        }
        return this._rtl?.rtl.value ? 'slim-arrow-left' : 'slim-arrow-right';
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

        if (!this.parentListItemComponent) {
            return this.isGroup$() ? !this.navigation.isSnapped$() : true;
        }

        if (this.navigation.isSnapped$()) {
            return this.normalizedLevel$() < 3;
        }

        return this.parentListItemComponent.isVisible$() && this.parentListItemComponent.expanded$();
    });

    /** aria-expanded attribute value. */
    readonly expandedAttr$ = computed(() => (this.navigation.isSnapped$() ? this.popoverOpen$() : this.expanded$()));

    /** @hidden */
    private readonly _links: NavigationLinkComponent[] = [];

    /** @hidden */
    private readonly _childLists: NavigationListComponent[] = [];

    /** @hidden */
    private _keyManager: Nullable<FocusKeyManager<FdbNavigationListItem>>;

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _parentNavigationService = inject(NavigationService, {
        skipSelf: true,
        optional: true
    });

    /** @hidden */
    constructor() {
        super();
        effect(() => {
            if (this.popoverOpen$()) {
                this._keyManager = new FocusKeyManager(this.listItems).withVerticalOrientation();
            } else {
                this._keyManager?.destroy();
            }
        });
    }

    /** @hidden */
    _focusLink(): void {
        if (this.popoverOpen$()) {
            this._links.find((link) => link.inPopover)?.elementRef.nativeElement.focus();
        }
    }

    /**
     * @hidden
     * When item is focused, we notify list container about it to update active index in FocusKeyManager.
     */
    _focusInHandler(): void {
        if (!this.parentListItemComponent?.popoverOpen$() && !this.isOverflow$()) {
            this.navigation.setActiveItem(this);
            return;
        }
        this._parentNavigationService?.currentItem$.next(this);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.listItems.changes.pipe(startWith(null)).subscribe(() => {
            this.listItems$.set(this.listItems.toArray());
        });
    }

    /** @hidden */
    registerLink(link: NavigationLinkComponent): void {
        if (this._links.indexOf(link) === -1) {
            this._links.push(link);
        }
    }

    /** @hidden */
    unregisterLink(link: NavigationLinkComponent): void {
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
            this._links.find((link) => link.inPopover)?.elementRef.nativeElement.focus();
            return;
        }

        if (KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            this._keyManager?.onKeydown(event);
            return;
        }

        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        const isGoBack = KeyUtil.isKeyCode(event, this._rtl?.rtl.value ? RIGHT_ARROW : LEFT_ARROW);

        if (!isGoBack) {
            return;
        }

        this._snappedItemKeyboardExpandedHandler(false);
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
     * @param origin
     */
    focus(origin?: FocusOrigin | undefined): void {
        // If popover is open, focus will be automatically shifted to cloned link.
        if (this.popoverOpen$()) {
            return;
        }
        this.link$()?.elementRef.nativeElement.focus();
    }

    /** @hidden */
    _onPopoverOpen(isOpen: boolean, popover: PopoverComponent): void {
        this.popoverOpen$.set(isOpen);
        if (!isOpen) {
            return;
        }

        this._zone.onStable.pipe(startWith(this._zone.isStable), observeOn(asyncScheduler), take(1)).subscribe(() => {
            popover.popoverBody._focusFirstTabbableElement(true);
        });
    }

    /** @hidden */
    private _visibleItemKeyboardExpandedHandler(shouldExpand: boolean): void {
        if (!this.hasChildren$()) {
            if (!shouldExpand) {
                this.parentListItemComponent?.focus();
            }
            return;
        }

        if (!shouldExpand) {
            // If item already collapsed, shift focus to parent link
            if (!this.expanded$()) {
                this.parentListItemComponent?.focus();
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
        console.log('_overflowItemKeyboardExpandedHandler');
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
}

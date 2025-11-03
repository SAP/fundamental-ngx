import { FocusOrigin, FocusableOption } from '@angular/cdk/a11y';
import { Signal, TemplateRef, computed, inject, signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NavigationListItemMarkerDirective } from '../components/navigation-item/navigation-list-item.component';
import { NavigationListComponent } from '../components/navigation-list/navigation-list.component';
import { FdbNavigationContentContainer } from './navigation-content-container.class';
import { FdbNavigationItemLink } from './navigation-item-link.class';
import { FdbNavigation } from './navigation.class';

export const LIST_ITEM_CLASS = 'fd-navigation__list-item';

export abstract class FdbNavigationListItem implements FocusableOption {
    abstract type: 'item' | 'showMore';
    abstract separator: boolean;
    abstract spacer: boolean;
    abstract home: boolean;
    abstract isVisible$: Signal<boolean>;
    abstract skipNavigation: boolean;
    abstract placementContainer?: FdbNavigationContentContainer;
    abstract parentListItemComponent: FdbNavigationListItemCmp | null;
    abstract parentListItem: FdbNavigationListItem | null;
    abstract class$: Signal<string>;
    abstract selected$: Signal<boolean>;
    abstract focus(origin?: FocusOrigin | undefined): void;
    abstract toggleExpanded(): void;
    abstract keyboardExpanded(shouldExpand: boolean): void;
    abstract popoverLinkArrowDown(): void;
    abstract registerLink(link: FdbNavigationItemLink): void;
    abstract unregisterLink(link: FdbNavigationItemLink): void;
    abstract registerChildList(list: NavigationListComponent): void;
    abstract unregisterChildList(list: NavigationListComponent): void;
    abstract handleHorizontalNavigation(isExpand: boolean): void;
    abstract focusLink(closePopover?: boolean): void;
    abstract canItemBeSelected(): boolean;

    /** Marker directive that is attached to the rendered list item. */
    marker: Nullable<NavigationListItemMarkerDirective>;

    /** @hidden */
    readonly listItems$ = signal<Nullable<FdbNavigationListItem>[]>([]);

    /** Whether item has child items. */
    readonly hasChildren$ = computed(() => this.listItems$().length > 0);

    /** Whether popover is open. Applicable for snapped navigation state. */
    readonly popoverOpen$ = signal(false);

    /**
     * Link reference.
     */
    readonly link$ = signal<Nullable<FdbNavigationItemLink>>(null);

    /**
     * Item content renderer.
     */
    readonly renderer$ = signal<TemplateRef<any> | null>(null);

    /**
     * Whether the item should be hidden under "More" button.
     */
    readonly hidden$ = signal(false);

    /**
     * Whether the item is in overflow menu. Applicable only when the navigation is in snapped mode.
     */
    readonly isOverflow$ = computed(() => this.navigation.isSnapped$() && this.hidden$());

    /**
     * Item Hierarchy level in navigation tree.
     */
    readonly level$ = computed(() => (this.parentListItem?.level$() || 0) + 1);

    /**
     * Normalized level. Calculated based on location of the item, whether it is inside group or not.
     * Can be different than `level$`.
     */
    readonly normalizedLevel$ = computed(() => {
        if (!this.parentListItem) {
            return this.inGroup$() ? this.level$() : this.level$() + 1;
        }

        return this.parentListItem.normalizedLevel$() + 1;
    });

    /**
     * Whether the List item should be marked as selected.
     * Based on a `snapped` state will determine whether to highlight the link if it, or it's child links are active.
     */
    readonly isActiveAttr$ = computed(
        () =>
            this.selected$() ||
            this.link$()?.isActive$() ||
            (this.navigation.isSnapped$() && this.listItems$().some((item) => item?.isActiveAttr$()))
    );

    /**
     * Whether the item is inside group.
     */
    readonly inGroup$ = computed(() => (this.parentListItem ? this.parentListItem.inGroup$() : this.isGroup$()));

    /** @hidden */
    readonly expanded$ = signal<boolean>(false);

    /** @hidden */
    readonly isGroup$ = signal(false);

    /** @hidden */
    readonly disabled$ = signal(false);

    /** Navigation container reference. */
    readonly navigation = inject(FdbNavigation);
}

export abstract class FdbNavigationListItemCmp extends FdbNavigationListItem {}

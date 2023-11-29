import { FocusOrigin, FocusableOption } from '@angular/cdk/a11y';
import { Signal, TemplateRef, computed, inject, signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NavigationListItemMarkerDirective } from '../components/navigation-item/navigation-list-item.component';
import { NavigationLinkComponent } from '../components/navigation-link/navigation-link.component';
import { NavigationListComponent } from '../components/navigation-list/navigation-list.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FdbNavigationContentContainer } from './navigation-content-container.class';

export abstract class FdbNavigationListItem implements FocusableOption {
    abstract type: 'item' | 'showMore';
    abstract isVisible$: Signal<boolean>;
    abstract placementContainer?: FdbNavigationContentContainer;
    abstract focus(origin?: FocusOrigin | undefined): void;
    abstract toggleExpanded(): void;
    abstract keyboardExpanded(shouldExpand: boolean): void;
    abstract popoverLinkArrowDown(): void;
    abstract registerLink(link: NavigationLinkComponent): void;
    abstract unregisterLink(link: NavigationLinkComponent): void;
    abstract registerChildList(list: NavigationListComponent): void;
    abstract unregisterChildList(list: NavigationListComponent): void;
    abstract handleHorizontalNavigation(isExpand: boolean): void;

    /** Marker directive that is attached to the rendered list item. */
    marker: Nullable<NavigationListItemMarkerDirective>;

    /** Optional parent list component. */
    readonly parentListItemComponent = inject(FdbNavigationListItem, {
        optional: true,
        skipSelf: true
    });

    /** @hidden */
    readonly listItems$ = signal<FdbNavigationListItem[]>([]);

    /** Whether item has child items. */
    readonly hasChildren$ = computed(() => this.listItems$().length > 0);

    /** Whether popover is open. Applicable for snapped navigation state. */
    readonly popoverOpen$ = signal(false);

    /**
     * Link reference.
     */
    readonly link$ = signal<Nullable<NavigationLinkComponent>>(null);

    /**
     * Item content renderer.
     */
    readonly renderer$ = signal<TemplateRef<any> | null>(null);

    /**
     * Whether the item is in overflow menu.
     */
    readonly isOverflow$ = signal(false);

    /**
     * Item Hierarchy level in navigation tree.
     */
    readonly level$ = computed(() => (this.parentListItemComponent?.level$() || 0) + 1);

    /**
     * Normalized level. Calculated based on location of the item, whether it is inside group or not.
     * Can be different than `level$`.
     */
    readonly normalizedLevel$ = computed(() => {
        if (!this.parentListItemComponent) {
            return this.inGroup$() ? this.level$() : this.level$() + 1;
        }

        return this.parentListItemComponent.normalizedLevel$() + 1;
    });

    /**
     * Whether the List item should be marked as selected.
     */
    readonly isActiveAttr$ = computed(
        () =>
            this.link$()?.isActive$() ||
            (this.navigation.isSnapped$() && this.listItems$().some((item) => item.isActiveAttr$()))
    );

    /**
     * Whether the item is inside group.
     */
    readonly inGroup$ = computed(() =>
        this.parentListItemComponent ? this.parentListItemComponent.inGroup$() : this.isGroup$()
    );

    /** @hidden */
    readonly expanded$ = signal<boolean>(false);

    /** @hidden */
    readonly isGroup$ = signal(false);

    /** Navigation container reference. */
    readonly navigation = inject(NavigationComponent);
}

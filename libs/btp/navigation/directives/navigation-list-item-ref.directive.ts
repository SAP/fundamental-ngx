import { Directive, Injector, Input, OnDestroy, TemplateRef, inject, signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationContentContainer } from '../models/navigation-content-container.class';
import { FdbNavigationListItem } from '../models/navigation-list-item.class';

@Directive({
    selector: '[fdbNavigationListItem]',
    standalone: true,
    providers: [
        {
            provide: FdbNavigationListItem,
            useExisting: NavigationListItemDirective
        }
    ],
    exportAs: 'fdbListItem'
})
export class NavigationListItemDirective implements OnDestroy {
    /**
     * Item definition.
     */
    @Input()
    item: any;

    /**
     * Injector used for rendering child list item component.
     * Allows list item component to inject parent list container and register itself as a child item.
     */
    readonly injector = Injector.create({ providers: [], parent: inject(Injector) });

    /** @hidden */
    readonly parentNavListItemDirective = inject(NavigationListItemDirective, {
        skipSelf: true,
        optional: true
    });

    /**
     * Set of child directives.
     * Used to build hierarchy tree.
     */
    readonly childDirectives = signal(new Set<NavigationListItemDirective>());

    /**
     * @hidden
     * Navigation list item component instance.
     */
    _item: Nullable<FdbNavigationListItem>;

    /** @hidden */
    private readonly _contentContainer = inject(FdbNavigationContentContainer, {
        optional: true
    });

    /** @hidden */
    constructor() {
        this.parentNavListItemDirective?.registerChildDirective(this);
    }

    /**
     * Registers child list item component for further usage.
     * @param item
     */
    registerItem(item: FdbNavigationListItem): void {
        this._item = item;

        // Apply item properties from data source to the navigation list item component
        if (this.item && this._item) {
            if (this.item.group !== undefined && 'group' in this._item) {
                (this._item as any).group = this.item.group;
            }
            if (this.item.expanded !== undefined && 'expanded' in this._item) {
                (this._item as any).expanded = this.item.expanded;
            }
            if (this.item.selected !== undefined && 'selected' in this._item) {
                (this._item as any).selected = this.item.selected;
            }
            if (this.item.separator !== undefined && 'separator' in this._item) {
                (this._item as any).separator = this.item.separator;
            }
            if (this.item.home !== undefined && 'home' in this._item) {
                (this._item as any).home = this.item.home;
            }
            if (this.item.quickCreate !== undefined && 'quickCreate' in this._item) {
                (this._item as any).quickCreate = this.item.quickCreate;
            }
            if (this.item.spacer !== undefined && 'spacer' in this._item) {
                (this._item as any).spacer = this.item.spacer;
            }
            if (this.item.disabled !== undefined && 'disabled' in this._item) {
                (this._item as any).disabled = this.item.disabled;
            }
        }

        this._contentContainer?.registerItem(this._item);
    }

    /**
     * Removes child list item.
     */
    unregisterItem(): void {
        this._item && this._contentContainer?.unregisterItem(this._item);
        this._item = null;
    }

    /**
     * Registers child directive.
     */
    registerChildDirective(directive: NavigationListItemDirective): void {
        this.childDirectives.update((list) => list.add(directive));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._item && this._contentContainer?.unregisterItem(this._item);
        this._item = null;
        this.childDirectives().clear();
    }
}

@Directive({
    selector: '[fdbNavigationListItemRef]',
    standalone: true
})
export class NavigationListItemRefDirective<T = any> {
    /** Type alias. */
    @Input()
    fdbNavigationListItemRefAs: T;
    /** Template reference. */
    readonly templateRef = inject<TemplateRef<T>>(TemplateRef);

    /** @hidden */
    static ngTemplateContextGuard<T>(dir: NavigationListItemRefDirective<T>, ctx: unknown): ctx is { $implicit: T } {
        return true;
    }
}

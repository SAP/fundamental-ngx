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

    /** Injector used for rendering child list item component. */
    readonly injector = Injector.create({ providers: [], parent: inject(Injector) });

    /** @hidden */
    readonly parentNavListItemDirective = inject(NavigationListItemDirective, {
        skipSelf: true,
        optional: true
    });

    /** Set of child directives. */
    readonly childDirectives = signal(new Set<NavigationListItemDirective>());

    /** @hidden */
    _item: Nullable<FdbNavigationListItem>;

    /** @hidden */
    private readonly _contentContainer = inject(FdbNavigationContentContainer, {
        optional: true
    });

    /** Component property retranslator */
    get normalizedLevel$(): FdbNavigationListItem['normalizedLevel$'] {
        return this._item!.normalizedLevel$;
    }

    /** Component property retranslator */
    get level$(): FdbNavigationListItem['level$'] {
        return this._item!.level$;
    }

    /** Component property retranslator */
    get hidden$(): FdbNavigationListItem['hidden$'] {
        return this._item!.hidden$;
    }

    /** Component property retranslator */
    get class$(): FdbNavigationListItem['class$'] {
        return this._item!.class$;
    }

    /** Component property retranslator */
    get renderer$(): FdbNavigationListItem['renderer$'] {
        return this._item!.renderer$;
    }

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
        this._contentContainer?.registerItem(this._item!);
    }

    /**
     * Removes child list item.
     */
    unregisterItem(): void {
        this._contentContainer?.unregisterItem(this._item!);
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
        this._contentContainer?.unregisterItem(this._item!);
        this._item = null;
        this.childDirectives().clear();
    }
}

@Directive({
    selector: '[fdbNavigationListItemRef]',
    standalone: true
})
export class NavigationListItemRefDirective {
    /** Template reference. */
    readonly templateRef = inject(TemplateRef);
}

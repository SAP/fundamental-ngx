import { DestroyRef, Signal, inject, signal } from '@angular/core';
import { FdbNavigationListItem } from './navigation-list-item.class';

export abstract class FdbNavigationContentContainer {
    /**
     * List containing child list items that needs to be rendered. Can be different than `allListItems$`.
     */
    abstract listItems$: Signal<FdbNavigationListItem[]>;
    /**
     * Container placement in Navigation component.
     */
    abstract placement: 'start' | 'end';
    /**
     * List containing all child navigation list items.
     */
    readonly allListItems$ = signal<FdbNavigationListItem[]>([]);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /**
     * @hidden
     * List of registered navigation list items.
     * Used only with data-driven navigation component.
     */
    private readonly _registeredListItems: FdbNavigationListItem[] = [];

    /**
     * Registers navigation list item.
     */
    registerItem(item: FdbNavigationListItem): void {
        if (this._registeredListItems.indexOf(item) > -1) {
            return;
        }

        this._registeredListItems.push(item);

        this.allListItems$.set(this._registeredListItems);
    }

    /**
     * Unregisters navigation list item.
     */
    unregisterItem(item: FdbNavigationListItem): void {
        const foundIndex = this._registeredListItems.indexOf(item);
        if (foundIndex === -1) {
            return;
        }

        this._registeredListItems.splice(foundIndex, 1);

        this.allListItems$.set(this._registeredListItems);
    }
}

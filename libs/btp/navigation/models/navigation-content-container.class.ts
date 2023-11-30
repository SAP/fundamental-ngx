import { DestroyRef, Signal, inject, signal } from '@angular/core';
import { FdbNavigationListItem } from './navigation-list-item.class';

export abstract class FdbNavigationContentContainer {
    abstract listItems$: Signal<FdbNavigationListItem[]>;
    abstract placement: 'start' | 'end';
    /** List items signal. */
    readonly allListItems$ = signal<FdbNavigationListItem[]>([]);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

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

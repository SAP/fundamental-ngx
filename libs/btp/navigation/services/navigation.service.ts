import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../models/navigation-list-item.class';

@Injectable()
export class NavigationService {
    /** Currently active list item. */
    currentItem$ = new Subject<FdbNavigationListItem>();

    /** Currently selected item (for click-based selection mode). */
    selectedItem$ = signal<FdbNavigationListItem | null>(null);

    /**
     * Set the selected item.
     * @param item The item to select, or null to clear selection.
     */
    setSelectedItem(item: FdbNavigationListItem | null): void {
        this.selectedItem$.set(item);
    }

    /**
     * Get the currently selected item.
     * @returns The currently selected item, or null if none is selected.
     */
    getSelectedItem(): FdbNavigationListItem | null {
        return this.selectedItem$();
    }
}

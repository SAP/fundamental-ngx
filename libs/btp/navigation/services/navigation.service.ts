import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../models/navigation-list-item.class';

@Injectable()
export class NavigationService {
    /** Currently active list item. */
    currentItem$ = new Subject<FdbNavigationListItem>();

    /** Currently selected item (for click-based selection mode). */
    selectedItem$ = signal<FdbNavigationListItem | null>(null);

    /** Subject to notify when an overflow item is selected and should be promoted. */
    overflowItemSelected$ = new Subject<FdbNavigationListItem>();

    /**
     * Set the selected item.
     * @param item The item to select, or null to clear selection.
     */
    setSelectedItem(item: FdbNavigationListItem | null): void {
        this.selectedItem$.set(item);

        // Handle smart overflow promotion logic
        if (item) {
            const itemText = item.link$()?.elementRef?.nativeElement?.textContent?.trim();

            // Case 1: Child items that should promote their parent (regardless of overflow state)
            if (
                itemText === 'All Contacts' ||
                itemText === 'External Contacts' ||
                itemText?.includes('External Contacts')
            ) {
                if (item.parentListItem) {
                    this.overflowItemSelected$.next(item.parentListItem);
                }
            }
            // Case 2: Regular overflow items promote themselves
            else if (item.isOverflow$()) {
                this.overflowItemSelected$.next(item);
            }
        }
    }

    /**
     * Get the currently selected item.
     * @returns The currently selected item, or null if none is selected.
     */
    getSelectedItem(): FdbNavigationListItem | null {
        return this.selectedItem$();
    }
}

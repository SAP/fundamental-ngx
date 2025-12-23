import { Component, computed, signal } from '@angular/core';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item';
import { SearchItemGroup } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item-group';
import { SearchItemShowMore } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item-show-more';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface SearchItemData {
    text: string;
    icon: string;
    id: string;
}

@Component({
    selector: 'ui5-doc-search-show-more-sample',
    templateUrl: './show-more-sample.html',
    standalone: true,
    imports: [Search, SearchItem, SearchItemGroup, SearchItemShowMore]
})
export class ShowMoreSample {
    private readonly visibleCount = 3;

    allItems = signal<SearchItemData[]>([
        { id: '1', text: 'List Item 1', icon: 'history' },
        { id: '2', text: 'List Item 2', icon: 'search' },
        { id: '3', text: 'List Item 3', icon: 'history' },
        { id: '4', text: 'List Item 4', icon: 'history' },
        { id: '5', text: 'List Item 5', icon: 'search' },
        { id: '6', text: 'List Item 6', icon: 'globe' }
    ]);

    group2Items = signal<SearchItemData[]>([
        { id: 'g2-1', text: 'Group 2 Item 1', icon: 'history' },
        { id: 'g2-2', text: 'Group 2 Item 2', icon: 'history' },
        { id: 'g2-3', text: 'Group 2 Item 3', icon: 'globe' }
    ]);

    showAllGroup1 = signal<boolean>(false);

    visibleGroup1Items = computed(() => {
        const items = this.allItems();
        return this.showAllGroup1() ? items : items.slice(0, this.visibleCount);
    });

    hiddenGroup1ItemsCount = computed(() => Math.max(0, this.allItems().length - this.visibleCount));

    showShowMore = computed(() => !this.showAllGroup1() && this.hiddenGroup1ItemsCount() > 0);

    onShowMoreClick(): void {
        this.showAllGroup1.set(true);
    }

    onDeleteItem(itemId: string): void {
        this.allItems.update((items) => items.filter((item) => item.id !== itemId));

        // Reset show all if we deleted items and now have fewer items
        if (this.allItems().length <= this.visibleCount) {
            this.showAllGroup1.set(false);
        }
    }

    onDeleteGroup2Item(itemId: string): void {
        this.group2Items.update((items) => items.filter((item) => item.id !== itemId));
    }
}

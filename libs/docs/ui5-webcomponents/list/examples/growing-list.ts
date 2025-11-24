import { Component, computed, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

interface DataItem {
    id: number;
    name: string;
    description: string;
    status: string;
}

@Component({
    selector: 'ui5-list-growing-example',
    templateUrl: './growing-list.html',
    standalone: true,
    imports: [List, ListItemStandard, Label, Button, Text]
})
export class ListGrowingExample {
    private readonly totalItems = 50;
    private readonly itemsPerLoad = 10;
    private itemsLoaded = signal(0);

    readonly displayedItems = signal<DataItem[]>([]);
    readonly isLoading = signal(false);
    readonly growingMode = signal<'None' | 'Button' | 'Scroll'>('Button');

    readonly hasMoreItems = computed(() => this.displayedItems().length < this.totalItems);

    readonly loadedCount = computed(() => this.displayedItems().length);

    readonly statusMessage = computed(() => `Loaded ${this.loadedCount()} of ${this.totalItems} items`);

    constructor() {
        this.loadInitialItems();
    }

    private generateItems(startIndex: number, count: number): DataItem[] {
        const items: DataItem[] = [];
        for (let i = 0; i < count && startIndex + i < this.totalItems; i++) {
            const id = startIndex + i + 1;
            items.push({
                id,
                name: `Task ${id}`,
                description: `Description for task ${id}`,
                status: ['Open', 'In Progress', 'Completed'][id % 3]
            });
        }
        return items;
    }

    private loadInitialItems(): void {
        const initialItems = this.generateItems(0, this.itemsPerLoad);
        this.displayedItems.set(initialItems);
        this.itemsLoaded.set(this.itemsPerLoad);
    }

    private async simulateNetworkDelay(): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    async onLoadMore(): Promise<void> {
        if (this.isLoading() || !this.hasMoreItems()) {
            return;
        }

        this.isLoading.set(true);

        await this.simulateNetworkDelay();

        const newItems = this.generateItems(this.itemsLoaded(), this.itemsPerLoad);

        this.displayedItems.update((items) => [...items, ...newItems]);
        this.itemsLoaded.update(() => this.itemsLoaded() + this.itemsPerLoad);
        this.isLoading.set(false);
    }

    onModeChange(mode: 'Button' | 'Scroll'): void {
        this.growingMode.set(mode);
        // Reinitialize list with appropriate initial content for the new mode
        this.loadInitialItems();
    }

    resetList(): void {
        this.loadInitialItems();
        this.isLoading.set(false);
    }
}

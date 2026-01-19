import { Component, computed, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableGrowing } from '@fundamental-ngx/ui5-webcomponents/table-growing';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
}

@Component({
    selector: 'ui5-doc-growing-table-sample',
    templateUrl: './growing-sample.html',
    standalone: true,
    imports: [Table, TableGrowing, TableHeaderRow, TableHeaderCell, TableRow, TableCell, Button]
})
export class GrowingTableSample {
    // Button growing table data
    readonly buttonGrowingProducts = signal<Product[]>([
        { id: 1, name: 'Laptop', category: 'Electronics', price: 1299, stock: 15, status: 'Active' },
        { id: 2, name: 'Mouse', category: 'Electronics', price: 29, stock: 120, status: 'Active' },
        { id: 3, name: 'Keyboard', category: 'Electronics', price: 79, stock: 45, status: 'Active' },
        { id: 4, name: 'Monitor', category: 'Electronics', price: 399, stock: 8, status: 'Pending' },
        { id: 5, name: 'Desk Chair', category: 'Furniture', price: 249, stock: 22, status: 'Active' },
        { id: 6, name: 'Notebook', category: 'Stationery', price: 5, stock: 200, status: 'Active' },
        { id: 7, name: 'Pen', category: 'Stationery', price: 2, stock: 500, status: 'Active' },
        { id: 8, name: 'Water Bottle', category: 'Accessories', price: 15, stock: 60, status: 'Active' },
        { id: 9, name: 'Desk Lamp', category: 'Furniture', price: 35, stock: 30, status: 'Pending' },
        { id: 10, name: 'Headphones', category: 'Electronics', price: 199, stock: 25, status: 'Active' }
    ]);

    readonly buttonVisibleGrowingProducts = computed(() =>
        this.buttonGrowingProducts().slice(0, this.buttonDisplayedItems())
    );
    readonly buttonDisplayedItems = signal<number>(3);
    readonly buttonHasMoreItems = computed(() => this.buttonDisplayedItems() < this.buttonGrowingProducts().length);

    // Scroll growing table data
    readonly scrollGrowingProducts = signal<Product[]>([
        { id: 1, name: 'Laptop', category: 'Electronics', price: 1299, stock: 15, status: 'Active' },
        { id: 2, name: 'Mouse', category: 'Electronics', price: 29, stock: 120, status: 'Active' },
        { id: 3, name: 'Keyboard', category: 'Electronics', price: 79, stock: 45, status: 'Active' },
        { id: 4, name: 'Monitor', category: 'Electronics', price: 399, stock: 8, status: 'Pending' },
        { id: 5, name: 'Desk Chair', category: 'Furniture', price: 249, stock: 22, status: 'Active' },
        { id: 6, name: 'Notebook', category: 'Stationery', price: 5, stock: 200, status: 'Active' },
        { id: 7, name: 'Pen', category: 'Stationery', price: 2, stock: 500, status: 'Active' },
        { id: 8, name: 'Water Bottle', category: 'Accessories', price: 15, stock: 60, status: 'Active' },
        { id: 9, name: 'Desk Lamp', category: 'Furniture', price: 35, stock: 30, status: 'Pending' },
        { id: 10, name: 'Headphones', category: 'Electronics', price: 199, stock: 25, status: 'Active' }
    ]);

    readonly scrollVisibleGrowingProducts = computed(() =>
        this.scrollGrowingProducts().slice(0, this.scrollDisplayedItems())
    );
    readonly scrollDisplayedItems = signal<number>(3);
    readonly scrollHasMoreItems = computed(() => this.scrollDisplayedItems() < this.scrollGrowingProducts().length);

    buttonLoadMore(): void {
        const current = this.buttonDisplayedItems();
        const max = this.buttonGrowingProducts().length;
        this.buttonDisplayedItems.set(Math.min(current + 2, max));
    }

    scrollLoadMore(): void {
        const current = this.scrollDisplayedItems();
        const max = this.scrollGrowingProducts().length;
        this.scrollDisplayedItems.set(Math.min(current + 2, max));
    }

    formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }
}

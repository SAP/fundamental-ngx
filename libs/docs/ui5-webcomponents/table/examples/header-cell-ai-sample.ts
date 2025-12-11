import { Component, computed, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderCellActionAI } from '@fundamental-ngx/ui5-webcomponents/table-header-cell-action-a-i';
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
    selector: 'ui5-doc-header-cell-ai-sample',
    templateUrl: './header-cell-ai-sample.html',
    standalone: true,
    imports: [Table, TableRow, TableCell, TableHeaderRow, TableHeaderCell, TableHeaderCellActionAI, Label]
})
export class HeaderCellAISample {
    readonly basicProducts = signal<Product[]>([
        { id: 1, name: 'Laptop', category: 'Electronics', price: 1299, stock: 15, status: 'Active' },
        { id: 2, name: 'Mouse', category: 'Electronics', price: 29, stock: 120, status: 'Active' },
        { id: 3, name: 'Keyboard', category: 'Electronics', price: 79, stock: 45, status: 'Active' },
        { id: 4, name: 'Monitor', category: 'Electronics', price: 399, stock: 8, status: 'Pending' },
        { id: 5, name: 'Desk Chair', category: 'Furniture', price: 249, stock: 22, status: 'Active' }
    ]);

    readonly basicProductsDisplay = computed(() => this.basicProducts());

    formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }
}

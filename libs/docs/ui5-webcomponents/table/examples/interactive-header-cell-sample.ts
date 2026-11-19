import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';
import { Toast } from '@fundamental-ngx/ui5-webcomponents/toast';

interface ProductData {
    rowKey: string;
    name: string;
    supplier: string;
    dimensions: string;
    price: string;
}

interface TableColumn {
    id: string;
    label: string;
}

@Component({
    selector: 'ui5-doc-interactive-header-cell-sample',
    templateUrl: './interactive-header-cell-sample.html',
    imports: [Table, TableHeaderRow, TableHeaderCell, Label, TableCell, TableRow, Toast]
})
export class InteractiveHeaderCellTableSample {
    readonly isToastOpen = signal(false);
    readonly toastMessage = signal('');

    readonly columns = signal<TableColumn[]>([
        { id: 'product', label: 'Product' },
        { id: 'supplier', label: 'Supplier' },
        { id: 'dimensions', label: 'Dimensions' },
        { id: 'price', label: 'Price' }
    ]);

    readonly products = signal<ProductData[]>([
        {
            rowKey: '1',
            name: 'Notebook Basic 15',
            supplier: 'Very Best Screens',
            dimensions: '30 x 18 x 3 cm',
            price: '956'
        },
        {
            rowKey: '2',
            name: 'Notebook Basic 17',
            supplier: 'Smartcards',
            dimensions: '29 x 17 x 3.1 cm',
            price: '1249'
        },
        {
            rowKey: '3',
            name: 'Notebook Basic 18',
            supplier: 'Technocom',
            dimensions: '32 x 21 x 4 cm',
            price: '29'
        }
    ]);

    onHeaderClick(column: TableColumn): void {
        this.toastMessage.set(`Header "${column.label}" clicked (column id: "${column.id}").`);
        this.isToastOpen.set(true);
    }

    onToastClose(): void {
        this.isToastOpen.set(false);
    }
}

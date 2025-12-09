import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';
import { Toast } from '@fundamental-ngx/ui5-webcomponents/toast';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface ProductData {
    rowKey: string;
    name: string;
    code: string;
    supplier: string;
    dimensions: string;
    weight: string;
    weightColor?: string;
    price: string;
}

interface TableColumn {
    id: string;
    label: string;
}

@Component({
    selector: 'ui5-doc-interactive-rows-table-sample',
    templateUrl: './interactive-rows-sample.html',
    standalone: true,
    imports: [Table, TableHeaderRow, TableHeaderCell, Label, TableCell, TableRow, Toast]
})
export class InteractiveRowsTableSample {
    readonly isToastOpen = signal(false);
    readonly toastMessage = signal('This is a basic toast notification!');
    readonly tableHeight = signal('150px');

    readonly columns = signal<TableColumn[]>([
        { id: 'product', label: 'Product' },
        { id: 'supplier', label: 'Supplier' },
        { id: 'dimensions', label: 'Dimensions' },
        { id: 'weight', label: 'Weight' },
        { id: 'price', label: 'Price' }
    ]);

    readonly products = signal<ProductData[]>([
        {
            rowKey: '1',
            name: 'Notebook Basic 15',
            code: 'HT-1000',
            supplier: 'Very Best Screens',
            dimensions: '30 x 18 x 3 cm',
            weight: '4.2',
            weightColor: '#2b7c2b',
            price: '956'
        },
        {
            rowKey: '2',
            name: 'Notebook Basic 17',
            code: 'HT-1001',
            supplier: 'Smartcards',
            dimensions: '29 x 17 x 3.1 cm',
            weight: '4.5',
            weightColor: '#2b7c2b',
            price: '1249'
        },
        {
            rowKey: '3',
            name: 'Notebook Basic 18',
            code: 'HT-1002',
            supplier: 'Technocom',
            dimensions: '32 x 21 x 4 cm',
            weight: '3.7',
            weightColor: '#2b7c2b',
            price: '29'
        }
    ]);

    onRowClick(event: UI5WrapperCustomEvent<Table, 'ui5RowClick'>): void {
        const rowKey = event.detail.row.getAttribute('row-key');
        this.toastMessage.set(`You clicked on row with key "${rowKey}".`);
        this.showToast();
    }

    showToast(): void {
        this.isToastOpen.set(true);
    }

    onToastClose(): void {
        this.isToastOpen.set(false);
    }
}

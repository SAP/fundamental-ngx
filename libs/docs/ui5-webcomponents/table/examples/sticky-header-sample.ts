import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface ProductData {
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
    width?: string;
    minWidth?: string;
    importance?: number;
    popinHidden?: boolean;
}

@Component({
    selector: 'ui5-doc-sticky-header-table-sample',
    templateUrl: './sticky-header-sample.html',
    standalone: true,
    imports: [Bar, Table, TableHeaderRow, TableHeaderCell, Label, TableCell, TableRow, Title, NgTemplateOutlet]
})
export class StickyHeaderTableSample {
    tableHeight = signal('150px');

    columns = signal<TableColumn[]>([
        { id: 'product', label: 'Product', width: '300px' },
        { id: 'supplier', label: 'Supplier', width: '200px' },
        { id: 'dimensions', label: 'Dimensions', minWidth: '300px' },
        { id: 'weight', label: 'Weight', width: '100px' },
        { id: 'price', label: 'Price', minWidth: '220px' }
    ]);

    products = signal<ProductData[]>([
        {
            name: 'Notebook Basic 15',
            code: 'HT-1000',
            supplier: 'Very Best Screens',
            dimensions: '30 x 18 x 3 cm',
            weight: '4.2',
            weightColor: '#2b7c2b',
            price: '956'
        },
        {
            name: 'Notebook Basic 17',
            code: 'HT-1001',
            supplier: 'Smartcards',
            dimensions: '29 x 17 x 3.1 cm',
            weight: '4.5',
            weightColor: '#2b7c2b',
            price: '1249'
        },
        {
            name: 'Notebook Basic 18',
            code: 'HT-1002',
            supplier: 'Technocom',
            dimensions: '32 x 21 x 4 cm',
            weight: '3.7',
            weightColor: '#2b7c2b',
            price: '29'
        }
    ]);
}

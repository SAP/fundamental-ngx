import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import icons
import '@ui5/webcomponents-icons/dist/detail-less.js';
import '@ui5/webcomponents-icons/dist/detail-more.js';

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

const enum HIDDEN_COLUMNS {
    DIMENSIONS = 'dimensions',
    WEIGHT = 'weight'
}

const hideDetails = 'Hide Details';

@Component({
    selector: 'ui5-doc-overflow-mode-table-sample',
    templateUrl: './overflow-mode-sample.html',
    standalone: true,
    imports: [
        Bar,
        Table,
        TableHeaderRow,
        TableHeaderCell,
        Label,
        TableCell,
        TableRow,
        SegmentedButton,
        SegmentedButtonItem
    ]
})
export class OverflowModeTableSample {
    tableWidth = signal('100%');

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

    scrollColumns = signal<TableColumn[]>([
        { id: 'product', label: 'Product', width: '300px' },
        { id: 'supplier', label: 'Supplier', width: '200px' },
        { id: 'dimensions', label: 'Dimensions', minWidth: '300px' },
        { id: 'weight', label: 'Weight', width: '100px' },
        { id: 'price', label: 'Price', minWidth: '220px' }
    ]);

    popinColumns = signal<TableColumn[]>([
        { id: 'product', label: 'Product', minWidth: '300px' },
        { id: 'supplier', label: 'Supplier', minWidth: '200px' },
        { id: 'dimensions', label: 'Dimensions', minWidth: '200px', importance: -1, popinHidden: true },
        { id: 'weight', label: 'Weight', minWidth: '100px', importance: -1, popinHidden: true },
        { id: 'price', label: 'Price', minWidth: '150px' }
    ]);

    onSizeChanged(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        const selectedItem = event.detail.selectedItems[0];
        const width = selectedItem.textContent?.trim() || '100%';
        this.tableWidth.set(width);
    }
    onShowHideDetailsChanged(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        const selectedItem = event.detail.selectedItems[0];

        if (selectedItem.getAttribute('tooltip') === hideDetails) {
            // Hide dimensions and weight columns
            this.updateColumnVisibility(HIDDEN_COLUMNS.DIMENSIONS, false);
            this.updateColumnVisibility(HIDDEN_COLUMNS.WEIGHT, false);
        } else {
            // Show dimensions and weight columns
            this.updateColumnVisibility(HIDDEN_COLUMNS.DIMENSIONS, true);
            this.updateColumnVisibility(HIDDEN_COLUMNS.WEIGHT, true);
        }
    }

    private updateColumnVisibility(columnId: string, show: boolean): void {
        this.popinColumns.update((cols) =>
            cols.map((col) => (col.id === columnId ? { ...col, popinHidden: !show } : col))
        );
    }
}

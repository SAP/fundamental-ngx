import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';
import { TableRowAction } from '@fundamental-ngx/ui5-webcomponents/table-row-action';
import { TableRowActionNavigation } from '@fundamental-ngx/ui5-webcomponents/table-row-action-navigation';

// Import icons
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/delete.js';
import '@ui5/webcomponents-icons/dist/edit.js';
import '@ui5/webcomponents-icons/dist/heart.js';
import '@ui5/webcomponents-icons/dist/share.js';

interface RowAction {
    icon: string;
    text: string;
    handler: string;
    invisible?: boolean;
}

interface ProductRow {
    rowKey: string;
    product: {
        name: string;
        code: string;
        link: string;
    };
    supplier: string;
    price: string;
    interactive?: boolean;
    navigated?: boolean;
    actions: RowAction[];
    hasNavigation?: boolean;
    navigationInteractive?: boolean;
}

@Component({
    selector: 'ui5-doc-row-action-table-sample',
    templateUrl: './row-action-sample.html',
    standalone: true,
    imports: [
        Table,
        TableHeaderRow,
        TableHeaderCell,
        TableRow,
        TableCell,
        Label,
        TableRowAction,
        TableRowActionNavigation
    ]
})
export class RowActionTableSample {
    maxRowActions = signal(3);

    products = signal<ProductRow[]>([
        {
            rowKey: '1',
            product: {
                name: 'Notebook Basic 15',
                code: 'HT-1000',
                link: '#'
            },
            supplier: 'Very Best Screens',
            price: '899.99',
            interactive: true,
            actions: [],
            hasNavigation: true,
            navigationInteractive: false
        },
        {
            rowKey: '2',
            product: {
                name: 'Astro Laptop 216',
                code: 'HT-1251',
                link: '#'
            },
            supplier: 'Technocom',
            price: '679.99',
            actions: [
                { icon: 'delete', text: 'Delete', handler: 'onDelete' },
                { icon: 'add', text: 'Add', handler: 'onAdd' },
                { icon: 'edit', text: 'Edit', handler: 'onEdit' },
                { icon: 'share', text: 'Share', handler: 'onShare' },
                { icon: 'heart', text: 'Like', handler: 'onLike' }
            ],
            hasNavigation: true,
            navigationInteractive: true
        },
        {
            rowKey: '3',
            product: {
                name: 'Benda Laptop 1408',
                code: 'HT-6102',
                link: '#'
            },
            supplier: 'Ultrasonic United',
            price: '699.99',
            navigated: true,
            actions: [
                { icon: 'share', text: 'Share', handler: 'onShare' },
                { icon: 'edit', text: 'Edit', handler: 'onEdit', invisible: true },
                { icon: 'heart', text: 'Like', handler: 'onLike' }
            ]
        },
        {
            rowKey: '4',
            product: {
                name: 'Broad Screen 22HD',
                code: 'HT-1255',
                link: '#'
            },
            supplier: 'Speaker Experts',
            price: '399.99',
            actions: [
                { icon: 'share', text: 'Share', handler: 'onShare' },
                { icon: 'add', text: 'Add', handler: 'onAdd' }
            ]
        }
    ]);

    onDelete(): void {
        console.log('Delete action clicked');
    }

    onAdd(): void {
        console.log('Add action clicked');
    }

    onEdit(): void {
        console.log('Edit action clicked');
    }

    onShare(): void {
        console.log('Share action clicked');
    }

    onLike(): void {
        console.log('Like action clicked');
    }

    onNavigate(): void {
        console.log('Navigate action clicked');
    }
    callHandler(handlerName: string): void {
        const handlers: Record<string, () => void> = {
            onDelete: () => this.onDelete(),
            onAdd: () => this.onAdd(),
            onEdit: () => this.onEdit(),
            onShare: () => this.onShare(),
            onLike: () => this.onLike(),
            onNavigate: () => this.onNavigate()
        };

        if (handlers[handlerName]) {
            handlers[handlerName]();
        }
    }
}

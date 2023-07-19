import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FdDate } from '@fundamental-ngx/core/datetime';
import {
    TableDataSource,
    TableDataProvider,
    TableState,
    TableRowToggleOpenStateEvent,
    TableRowsRearrangeEvent,
    TableService
} from '@fundamental-ngx/platform/table';

@Component({
    selector: 'fdp-platform-table-virtual-scroll-example',
    templateUrl: './platform-table-virtual-scroll-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PlatformTableVirtualScrollExampleComponent implements OnInit {
    source: TableDataSource<ExampleItem>;
    state: TableState;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
    }

    ngOnInit(): void {
        this.state = this._getDefaultState();
    }

    /**
     * Simulating scroll position update. Once table is initialized app can set back preserved scrolling table
     * position so table can scroll it its original state.
     *
     * Note: Bellow scrollTopPosition property is set based on the scrolling position that was read from
     * this table example. Just some number to showcase this.
     */
    _getDefaultState(): TableState {
        return {
            columnKeys: [],
            sortBy: [],
            filterBy: [],
            groupBy: [],
            columns: [],
            searchInput: {
                category: null,
                text: ''
            },
            freezeToColumn: null,
            freezeToEndColumn: null,
            page: {
                pageSize: 0,
                currentPage: 1
            },
            scrollTopPosition: 3310
        };
    }
}

export interface ExampleItem {
    name: string;
    description?: string;
    price?: {
        value: number;
        currency: string;
    };
    status?: string;
    statusColor?: string;
    date?: FdDate;
    verified?: boolean;
    children?: ExampleItem[];
}

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [...ITEMS];
    totalItems = ITEMS.length;

    fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.items = [...ITEMS];

        this.totalItems = this.items.length;

        return of(this.items);
    }
}

// Example items
const ITEMS: ExampleItem[] = new Array(5000).fill(null).map((_, index) => ({
    name: 'Laptops ' + index,
    children: [
        {
            name: 'Astro Laptop 1516',
            description: 'pede malesuada',
            price: {
                value: 489.01,
                currency: 'EUR'
            },
            status: 'Out of stock',
            statusColor: 'negative',
            date: new FdDate(2020, 2, 5),
            verified: true
        },
        {
            name: 'Benda Laptop 1408',
            description: 'suspendisse potenti cras in',
            price: {
                value: 243.49,
                currency: 'CNY'
            },
            status: 'Stocked on demand',
            statusColor: 'informative',
            date: new FdDate(2020, 9, 22),
            verified: true
        }
    ]
}));

import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { PlatformTableModule, TableComponent } from '@fundamental-ngx/platform/table';
import {
    TableDataProvider,
    TableDataSource,
    TableDataSourceDirective,
    TableDraggableDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective,
    TableState,
    TableVirtualScrollDirective
} from '@fundamental-ngx/platform/table-helpers';
import { Observable, delay, of } from 'rxjs';

@Component({
    selector: 'fdp-table-custom-pagination-example',
    imports: [
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        TableDraggableDirective,
        TableVirtualScrollDirective,
        FdDatetimeModule,
        PaginationModule
    ],
    templateUrl: './table-custom-pagination-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCustomPaginationExampleComponent implements OnInit {
    @ViewChild(TableComponent)
    table: TableComponent<ExampleItem>;

    source: TableDataSource<ExampleItem>;
    state: TableState;
    currentPage = 1;
    pageSize = 50;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
    }

    ngOnInit(): void {
        this.state = this._getDefaultState();
    }

    pageChanged(currentPage: number): void {
        this.currentPage = currentPage;
        this.table.setCurrentPage(this.currentPage);
    }

    itemsPerPageChanged(itemsPerPage: number): void {
        this.pageSize = itemsPerPage;
        this.table.setPageSize(this.pageSize, true);
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
                pageSize: this.pageSize,
                currentPage: this.currentPage
            },
            scrollTopPosition: 0
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

        const currentPage = tableState?.page.currentPage || 1;
        const size = tableState?.page.pageSize || 50;
        const skip = (currentPage - 1) * size;

        const paginatedItems = this.items.slice(skip, size * currentPage);

        return of(paginatedItems).pipe(delay(1000));
    }
}

// Example items
const ITEMS: ExampleItem[] = new Array(5000).fill(null).map((_, index) => ({
    name: 'Laptops ' + index,
    price: {
        value: Math.floor(Math.random() * 1000),
        currency: 'USD'
    }
}));

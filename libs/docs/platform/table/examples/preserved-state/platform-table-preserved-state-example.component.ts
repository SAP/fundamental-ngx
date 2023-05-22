import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import {
    CollectionBooleanFilter,
    CollectionCustomFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionGroup,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionSort,
    CollectionStringFilter,
    FilterNumberStrategy,
    FilterType,
    SortDirection,
    TableColumnsChangeEvent,
    TableComponent,
    TableDataProvider,
    TableDataSource,
    TableFilterChangeEvent,
    TableFilterSelectOption,
    TableGroupChangeEvent,
    TablePageChangeEvent,
    TableRowsRearrangeEvent,
    TableRowToggleOpenStateEvent,
    TableSortChangeEvent,
    TableState
} from '@fundamental-ngx/platform/table';
import { map, Observable, of } from 'rxjs';

@Component({
    selector: 'fdp-platform-table-preserved-state-example',
    templateUrl: './platform-table-preserved-state-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTablePreservedStateExampleComponent {
    @ViewChild(TableComponent)
    table: TableComponent;

    sortBy: CollectionSort[] = [{ field: 'price.value', direction: SortDirection.ASC }];

    columns: string[] = ['name', 'price', 'status'];

    groupBy: CollectionGroup[] = [];

    items = buildTree([...ITEMS]);

    source = new ExampleTableDataSource(new ExampleTableProvider(this.items));

    // source = of(ITEMS);

    page = 1;

    readonly sortDirectionEnum = SortDirection;

    initialFilterBy: CollectionFilter[] = [];

    displayTable = true;

    tableOffset = 0;

    applyScroll = false;

    toggleTable(): void {
        this.applyScroll = !this.displayTable;
        this.displayTable = !this.displayTable;
        this.items = buildTree([...ITEMS]);
        this.source = new ExampleTableDataSource(new ExampleTableProvider(this.items));
    }

    /** Update current set of visible columns. */
    columnChangeCallback(evt: TableColumnsChangeEvent): void {
        console.log(evt);
        this.columns = evt.current;
    }

    /** Update current set of grouping rules. */
    groupingChangeCallback(evt: TableGroupChangeEvent): void {
        console.log(evt);
        this.groupBy = evt.current;
    }

    filtersChangeCallback(evt: TableFilterChangeEvent): void {
        console.log(evt);
        this.initialFilterBy = evt.current;
    }

    sortingChangeCallback(evt: TableSortChangeEvent): void {
        console.log(evt);
        this.sortBy = evt.current;
    }

    onRowsRearrange(evt: TableRowsRearrangeEvent<ExampleItem>): void {
        console.log(evt);
        const dragRowIndex = ITEMS.findIndex((i) => i.id === evt.row.id);
        const dropRowIndex = ITEMS.findIndex((i) => i.id === evt.dropRow.id);
    }

    rowToggleCallback(evt: TableRowToggleOpenStateEvent<ExampleItem>): void {
        const rowIndex = ITEMS.findIndex((i) => i.id === evt.row.id);
        if (rowIndex === -1) {
            return;
        }
        ITEMS[rowIndex].expanded = evt.expanded;
    }

    pageChangeCallback(evt: TablePageChangeEvent): void {
        console.log(evt);
        this.page = evt.current.currentPage;
    }

    setTableOffset(offset: number): void {
        this.tableOffset = offset;
    }

    onTableRowsSet(): void {
        if (!this.applyScroll) {
            return;
        }
        this.applyScroll = false;
        this.table.tableScrollable.setScrollTop(this.tableOffset, false);
    }
}

export interface ExampleItem {
    id: number;
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
    date: FdDate;
    verified: boolean;
    children?: ExampleItem[];
    expanded?: boolean;
    parentId?: number;
}

export class ExampleTableDataSource extends TableDataSource<ExampleItem> {
    constructor(dataProvider: ExampleTableProvider) {
        super(dataProvider);
    }
}

export class ExampleTableProvider extends TableDataProvider<ExampleItem> {
    constructor(items) {
        super();
        this.items = items;
        this.totalItems = this.items.length;
    }
    override fetchData(state: TableState): Observable<ExampleItem[]> {
        return this.fetch().pipe(
            map((items) => {
                if (this.searchInput) {
                    items = this.search(items, { ...state, ...{ searchInput: this.searchInput } });
                }

                if (this.filterBy) {
                    items = this.applyFiltering(items, this.filterBy);
                }
                return items.slice(
                    (state.page.currentPage - 1) * state.page.pageSize,
                    state.page.currentPage * state.page.pageSize
                );
            })
        );
    }

    override fetch(tableState?: TableState): Observable<ExampleItem[]> {
        return of(this.items);
    }
}

function buildTree(items: ExampleItem[], id?: number): ExampleItem[] {
    return items
        .filter((item) => item.parentId === id)
        .map((item) => ({ ...item, children: buildTree(items, item.id) }));
}

// Example items
const ITEMS: ExampleItem[] = [
    {
        id: 1,
        name: '10 Portable DVD player',
        description: 'diam neque vestibulum eget vulputate',
        price: {
            value: 66.04,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 7),
        verified: true,
        expanded: false
    },
    {
        id: 2,
        name: 'Astro Laptop 1516',
        description: 'pede malesuada',
        price: {
            value: 489.01,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 2, 5),
        verified: true,
        parentId: 1
    },
    {
        id: 3,
        name: 'Benda Laptop 1408',
        description: 'suspendisse potenti cras in',
        price: {
            value: 243.49,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 9, 22),
        verified: true,
        parentId: 1
    },
    {
        id: 4,
        name: 'Astro Laptop 1516',
        description: 'pede malesuada',
        price: {
            value: 489.01,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 2, 5),
        verified: true,
        expanded: true,
        children: []
    },
    {
        id: 5,
        name: '10 Portable DVD player',
        description: 'diam neque vestibulum eget vulputate',
        price: {
            value: 66.04,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 7),
        verified: true,
        expanded: true,
        parentId: 4
    },
    {
        id: 6,
        name: 'Astro Phone 6',
        description: 'penatibus et magnis',
        price: {
            value: 154.1,
            currency: 'IDR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 12),
        verified: true,
        parentId: 5
    },
    {
        id: 7,
        name: 'Beam Breaker B-1',
        description: 'fermentum donec ut',
        price: {
            value: 36.56,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 11, 24),
        verified: false,
        parentId: 5
    },
    {
        id: 8,
        name: 'Beam Breaker B-2',
        description: 'sapien in sapien iaculis congue',
        price: {
            value: 332.57,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 10, 23),
        verified: true,
        parentId: 5
    },
    {
        id: 9,
        name: 'Astro Phone 6',
        description: 'penatibus et magnis',
        price: {
            value: 154.1,
            currency: 'IDR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 12),
        verified: true
    },
    {
        id: 10,
        name: 'Beam Breaker B-1',
        description: 'fermentum donec ut',
        price: {
            value: 36.56,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 11, 24),
        verified: false
    },
    {
        id: 11,
        name: 'Beam Breaker B-2',
        description: 'sapien in sapien iaculis congue',
        price: {
            value: 332.57,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 10, 23),
        verified: true
    },
    {
        id: 12,
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
    },
    {
        id: 13,
        name: 'Bending Screen 21HD',
        description: 'nunc nisl duis bibendum',
        price: {
            value: 66.46,
            currency: 'EUR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 8, 14),
        verified: false
    },
    {
        id: 14,
        name: 'Blaster Extreme',
        description: 'quisque ut',
        price: {
            value: 436.88,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 8, 15),
        verified: true
    },
    {
        id: 15,
        name: 'Broad Screen 22HD',
        description: 'ultrices posuere',
        price: {
            value: 458.18,
            currency: 'CNY'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 5, 4),
        verified: true
    },
    {
        id: 16,
        name: 'Camcorder View',
        description: 'integer ac leo pellentesque',
        price: {
            value: 300.52,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 5, 5),
        verified: true
    },
    {
        id: 17,
        name: 'Cepat Tablet 10.5',
        description: 'rutrum rutrum neque aenean auctor',
        price: {
            value: 365.12,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 5, 6),
        verified: true
    },
    {
        id: 18,
        name: 'Ergo Mousepad',
        description: 'tortor duis mattis egestas',
        price: {
            value: 354.46,
            currency: 'EUR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 5, 7),
        verified: true
    },
    {
        id: 19,
        name: 'Ergo Screen E-I',
        description: 'massa quis augue luctus tincidunt',
        price: {
            value: 387.23,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 3, 23),
        verified: true
    },
    {
        id: 20,
        name: 'Ergo Screen E-II',
        description: 'orci eget',
        price: {
            value: 75.86,
            currency: 'EUR'
        },
        status: 'No info',
        date: new FdDate(2020, 3, 20),
        verified: false
    },
    {
        id: 21,
        name: 'Gaming Monster',
        description: 'cubilia curae',
        price: {
            value: 152.95,
            currency: 'EGP'
        },
        status: 'No info',
        date: new FdDate(2020, 9, 20),
        verified: false
    },
    {
        id: 22,
        name: 'Gaming Monster Pro',
        description: 'pharetra magna vestibulum aliquet',
        price: {
            value: 213.47,
            currency: 'MZN'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 4, 17),
        verified: false
    }
];

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionSort,
    CollectionStringFilter,
    SortDirection,
    TableColumnsChangeEvent,
    TableComponent,
    TableDataProvider,
    TableDataSource,
    TableFilterChangeEvent,
    TablePageChangeEvent,
    TableRowsRearrangeEvent,
    TableRowToggleOpenStateEvent,
    TableSortChangeEvent,
    TableState
} from '@fundamental-ngx/platform/table';
import { delay, map, merge, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { destroyObservable } from '@fundamental-ngx/cdk';

@Component({
    selector: 'fdp-platform-table-preserved-state-example',
    templateUrl: './platform-table-preserved-state-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class PlatformTablePreservedStateExampleComponent {
    @ViewChild(TableComponent)
    table: TableComponent;

    sortBy: CollectionSort[] = [{ field: 'price.value', direction: SortDirection.ASC }];

    columns: string[] = ['name', 'price', 'status'];

    items = [...ITEMS];

    private _dateTimeAdapter = inject<DatetimeAdapter<FdDate>>(DatetimeAdapter);

    private readonly _cdr = inject(ChangeDetectorRef);

    source = new ExampleTableDataSource(new ExampleTableProvider(this.items, this._dateTimeAdapter));

    page = 1;

    initialFilterBy: CollectionFilter[] = [];

    displayTable = true;

    tableOffset = 0;

    applyScroll = false;

    private readonly _destroyRef = inject(DestroyRef);

    private _refresh$: Subject<void> = new Subject();

    toggleTable(): void {
        this.applyScroll = !this.displayTable;
        this.displayTable = !this.displayTable;
        this.items = [...ITEMS];
        this.source = new ExampleTableDataSource(new ExampleTableProvider(this.items, this._dateTimeAdapter));

        this._cdr.detectChanges();

        this._listenOnTableData();
    }

    /**
     * Method that listens on table's dataReceived event, then switches to tableRowsSet event to restore the scroll position.
     * This is needed for cases when there's a delay in data source data retrieval.
     */
    private _listenOnTableData(): void {
        this._refresh$.next();
        this._refresh$.complete();

        this._refresh$ = new Subject();

        if (!this.table) {
            return;
        }

        const refresh = merge(destroyObservable(this._destroyRef), this._refresh$);

        this.table._dataSourceDirective.onDataReceived
            .pipe(
                switchMap(() => this.table.tableRowsSet),
                takeUntil(refresh)
            )
            .subscribe(() => {
                if (!this.applyScroll) {
                    return;
                }
                this.applyScroll = false;
                this.table.tableScrollable.setScrollTop(this.tableOffset, false);
            });
    }

    ngAfterViewInit(): void {
        this._listenOnTableData();
    }

    /** Update current set of visible columns. */
    columnChangeCallback(evt: TableColumnsChangeEvent): void {
        console.log(evt);
        this.columns = evt.current;
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
    constructor(items, public dateTimeAdapter: DatetimeAdapter<FdDate>) {
        super();
        this.items = items;
        this.totalItems = this.items.length;
    }
    override fetchData(state: TableState): Observable<ExampleItem[]> {
        return this.fetch(state).pipe(
            map((items) => {
                if (this.searchInput) {
                    items = this.search(items, { ...state, ...{ searchInput: this.searchInput } });
                }
                // apply filtering
                if (state?.filterBy) {
                    items = this.filter(items, state);
                }
                // apply sorting
                if (state?.sortBy) {
                    items = this.sort(state, items);
                }
                return buildTree(items).slice(
                    (state.page.currentPage - 1) * state.page.pageSize,
                    state.page.currentPage * state.page.pageSize
                );
            }),
            delay(1000)
        );
    }

    override fetch(tableState?: TableState): Observable<ExampleItem[]> {
        let items = this.items;

        return of(items);
    }

    sort({ sortBy }: TableState, items: ExampleItem[]): ExampleItem[] {
        items = items.slice();

        sortBy = sortBy.filter(({ field }) => !!field);

        if (sortBy.length === 0) {
            return items;
        }

        return items.sort(
            (a, b) =>
                sortBy
                    .map(({ field, direction }) => {
                        const ascModifier = direction === SortDirection.ASC ? 1 : -1;
                        return sort(a, b, field as string) * ascModifier;
                    })
                    .find((result, index, list) => result !== 0 || index === list.length - 1) ?? 0
        );
    }

    private filter(items: ExampleItem[], { filterBy }: TableState): ExampleItem[] {
        filterBy
            .filter(({ field }) => !!field)
            .forEach((rule) => {
                items = items.filter((item) => {
                    switch (rule.field) {
                        case 'name':
                        case 'description':
                            return filterByString(item, rule as CollectionStringFilter);
                        case 'price.value':
                            return this.filterByPrice(item, rule);
                        case 'status':
                            return this.filterByStatus(item, rule);
                        case 'statusColor':
                            return this.filterByStatusColor(item, rule);
                        case 'verified':
                            return filterByBoolean(item, rule as CollectionBooleanFilter);
                        case 'date':
                            return filterByDate(item, rule as CollectionBooleanFilter, this.dateTimeAdapter);
                        default:
                            return false;
                    }
                });
            });

        return items;
    }

    private filterByPrice(item: ExampleItem, rule: CollectionFilter): boolean {
        const filterValue = rule.value;
        if (filterValue && typeof filterValue === 'object' && ('min' in filterValue || 'max' in filterValue)) {
            const filterModel: { min: number; max: number } = rule.value;
            const price = item.price.value;
            const min = Number.parseFloat(filterModel?.min as any);
            const max = Number.parseFloat(filterModel?.max as any);
            return (Number.isNaN(min) || price >= min) && (Number.isNaN(max) || price <= max);
        }
        return filterByNumber(item, rule as CollectionNumberFilter);
    }

    private filterByStatus(item: ExampleItem, rule: CollectionFilter): boolean {
        if (Array.isArray(rule.value)) {
            return filterBySelect(item, rule as CollectionSelectFilter);
        }
        return filterByString(item, rule as CollectionStringFilter);
    }

    private filterByStatusColor(item: ExampleItem, rule: CollectionFilter): boolean {
        if (Array.isArray(rule.value)) {
            return filterBySelect(item, rule as CollectionSelectFilter);
        }
        return filterByString(item, rule as CollectionStringFilter);
    }
}

const filterByString = (item: ExampleItem, filter: CollectionStringFilter): boolean => {
    const filterValue = filter.value && filter.value.toLocaleLowerCase();
    const filterValue2 = (filter.value2 && filter.value2.toLocaleLowerCase()) || '';
    const itemValue = getNestedValue(filter.field, item).toLocaleLowerCase();
    let result = false;

    switch (filter.strategy) {
        case 'equalTo':
            result = itemValue === filterValue;
            break;
        case 'greaterThan':
            result = itemValue > filterValue;
            break;
        case 'greaterThanOrEqualTo':
            result = itemValue >= filterValue;
            break;
        case 'lessThan':
            result = itemValue < filterValue;
            break;
        case 'lessThanOrEqualTo':
            result = itemValue <= filterValue;
            break;
        case 'between':
            result = itemValue >= filterValue && itemValue <= filterValue2;
            break;
        case 'beginsWith':
            result = itemValue.startsWith(filterValue);
            break;
        case 'endsWith':
            result = itemValue.endsWith(filterValue);
            break;
        case 'contains':
        default:
            result = itemValue.includes(filterValue);
    }

    return filter.exclude ? !result : result;
};

const filterByNumber = (item: ExampleItem, filter: CollectionNumberFilter): boolean => {
    const filterValue = Number.parseFloat(filter.value as unknown as string);
    const filterValue2 = Number.parseFloat(filter.value2 as unknown as string) || 0;
    const itemValue = Number.parseFloat(getNestedValue(filter.field, item));
    let result = false;

    switch (filter.strategy) {
        case 'greaterThan':
            result = itemValue > filterValue;
            break;
        case 'greaterThanOrEqualTo':
            result = itemValue >= filterValue;
            break;
        case 'lessThan':
            result = itemValue < filterValue;
            break;
        case 'lessThanOrEqualTo':
            result = itemValue <= filterValue;
            break;
        case 'between':
            result = itemValue >= filterValue && itemValue <= filterValue2;
            break;
        case 'equalTo':
        default:
            result = itemValue === filterValue;
    }

    return filter.exclude ? !result : result;
};

const filterByDate = <D = FdDate>(
    item: ExampleItem,
    filter: CollectionDateFilter,
    adapter: DatetimeAdapter<D>
): boolean => {
    const filterValue = filter.value;
    const filterValue2 = filter.value2;
    const itemValue = getNestedValue(filter.field, item);
    const diff = adapter.compareDate(itemValue, filterValue);
    let result = false;

    switch (filter.strategy) {
        case 'after':
            result = diff > 0;
            break;
        case 'onOrAfter':
            result = diff >= 0;
            break;
        case 'before':
            result = diff < 0;
            break;
        case 'beforeOrOn':
            result = diff <= 0;
            break;
        case 'between':
            result = adapter.isBetween(itemValue, filterValue, filterValue2);
            break;

        case 'equalTo':
        default:
            result = adapter.dateTimesEqual(itemValue, filterValue);
    }

    return filter.exclude ? !result : result;
};

const filterByBoolean = (item: ExampleItem, filter: CollectionBooleanFilter): boolean => {
    const filterValue = filter.value;
    const itemValue = getNestedValue(filter.field, item);
    let result = false;

    switch (filter.strategy) {
        case 'equalTo':
        default:
            result = itemValue === filterValue;
    }

    return filter.exclude ? !result : result;
};

const filterBySelect = (item: ExampleItem, filter: CollectionSelectFilter): boolean => {
    const filterValues = filter.value;
    const itemValue = getNestedValue(filter.field, item);
    let result = false;

    switch (filter.strategy) {
        case 'equalTo':
        default:
            result = filterValues.includes(itemValue);
    }

    return !filterValues.length || filter.exclude ? !result : result;
};

const sort = <T extends Record<string, any>>(a: T, b: T, key?: string): number => {
    if (key) {
        a = getNestedValue(key, a);
        b = getNestedValue(key, b);
    }
    return a > b ? 1 : a === b ? 0 : -1;
};

function getNestedValue<T extends Record<string, any>>(key: string, object: T): any {
    return key.split('.').reduce((a, b) => (a ? a[b] : null), object);
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

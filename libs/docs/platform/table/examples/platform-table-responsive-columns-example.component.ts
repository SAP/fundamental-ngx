import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { resizeObservable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    PlatformTableModule,
    TableComponent,
    TableDataProvider,
    TableDataSource,
    TableState
} from '@fundamental-ngx/platform/table';
import {
    FdpCellDef,
    FdpTableCell,
    PlatformTableColumnResponsiveDirective,
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'fdp-platform-table-responsive-columns-example',
    templateUrl: './platform-table-responsive-columns-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        PlatformTableColumnResponsiveDirective,
        FdpCellDef,
        FdpTableCell,
        ObjectStatusComponent,
        FdDatetimeModule
    ]
})
export class PlatformTableResponsiveColumnsExampleComponent implements AfterViewInit {
    @ViewChild(TableComponent, { read: ElementRef })
    table: ElementRef<HTMLElement>;

    source: TableDataSource<ExampleItem>;

    tableWidth = '450px';

    currentTableWidth = 0;

    constructor(
        private _destroyRef: DestroyRef,
        private _cdr: ChangeDetectorRef
    ) {
        this.source = new TableDataSource(new TableDataProviderExample());
    }

    trackBy(index: number, item: ExampleItem): number {
        return item.id;
    }

    alert(message: string): void {
        alert(message);
    }

    ngAfterViewInit(): void {
        resizeObservable(this.table.nativeElement)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this.currentTableWidth = Math.ceil(this.table.nativeElement.getBoundingClientRect().width);
                this._cdr.detectChanges();
            });
    }

    setTableWidth(value: string): void {
        this.tableWidth = value;
        this._cdr.detectChanges();
    }

    handleNavigate(): void {
        alert('Navigation event');
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

        // apply searching
        if (tableState?.searchInput) {
            this.items = this.search(this.items, tableState);
        }

        this.totalItems = this.items.length;

        return of(this.items);
    }

    search(items: ExampleItem[], { searchInput, columnKeys }: TableState): ExampleItem[] {
        const searchText = searchInput?.text || '';
        const keysToSearchBy = columnKeys;

        if (searchText.trim() === '' || keysToSearchBy.length === 0) {
            return items;
        }

        return items.filter((item) => {
            const valuesForSearch = keysToSearchBy.map((key) => getNestedValue(key, item));
            return valuesForSearch
                .filter((value) => !!value)
                .map((value): string => value.toString())
                .some((value) => value.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
        });
    }
}

function getNestedValue<T extends Record<string, any>>(key: string, object: T): any {
    return key.split('.').reduce((a, b) => (a ? a[b] : null), object);
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
        verified: true
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
        verified: true
    },
    {
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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

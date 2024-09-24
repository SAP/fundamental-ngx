import { AsyncPipe, DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonBarComponent, DynamicPageModule, MessageBoxModule, MessageBoxService } from '@fundamental-ngx/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
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
    standalone: true,
    imports: [
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        TableDraggableDirective,
        TableVirtualScrollDirective,
        FdDatetimeModule,
        PaginationModule,
        ButtonComponent,
        AsyncPipe,
        DatePipe,
        RouterLink,
        MessageBoxModule,
        ButtonBarComponent,
        DynamicPageModule
    ],
    templateUrl: './table-custom-pagination-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCustomPaginationExampleComponent implements OnInit {
    @ViewChild(TableComponent)
    table!: TableComponent<ExampleItem>;
    itemType!: ExampleItem;
    source: TableDataSource<ExampleItem>;
    state!: TableState;
    currentPage = 5;
    pageSize = 20;
    tableOffset = 0;
    private readonly _messageBoxService = inject(MessageBoxService);
    deletingInProgress = false;
    private readonly cdr = inject(ChangeDetectorRef);

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

    deleteGuidelineItem(item: ExampleItem, messageBox: TemplateRef<any>): void {
        this.deletingInProgress = true;
        const messageBoxRef = this._messageBoxService.open(messageBox, {
            ariaLabelledBy: 'fd-message-box-template-base-header fd-message-box-template-base-body',
            focusTrapped: true
        });

        messageBoxRef.afterClosed.subscribe({
            next: () => {
                this.deletingInProgress = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.deletingInProgress = false;
                this.cdr.detectChanges();
            }
        });
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
    description: string;
    property1: string;
    property2: string;
    createdAt: Date;
}

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    override items: ExampleItem[] = [...ITEMS];
    override totalItems = ITEMS.length;

    override fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.items = [...ITEMS];

        this.totalItems = this.items.length;

        const currentPage = tableState?.page.currentPage || 1;
        const size = tableState?.page.pageSize || 20;
        const skip = (currentPage - 1) * size;

        const paginatedItems = this.items.slice(skip, size * currentPage);

        return of(paginatedItems).pipe(delay(1000));
    }
}

// Example items
const ITEMS: ExampleItem[] = new Array(5000).fill(null).map((_, index) => ({
    name: 'Laptops ' + index,
    description:
        index % 2 === 0
            ? 'Laptop Description: ' + index
            : 'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index +
              'Laptop Description: ' +
              index,
    property1: 'Property 1 Value',
    property2: 'Property 2 Value',
    createdAt: new Date('Jul 5, 2024, 10:45 AM')
}));

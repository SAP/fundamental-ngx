import { Directive, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { DataSourceDirective, FD_DATA_SOURCE_TRANSFORMER } from '@fundamental-ngx/cdk/data-source';
import { BehaviorSubject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { FDP_TABLE_STATE_DIRECTIVE } from '../constants';
import { TableDataSource, TableDataSourceParser } from '../domain';
import { TableInitialState } from '../models';
import { TableService } from '../services/table.service';
import { Table } from '../table';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-table[dataSource]',
    standalone: true,
    providers: [
        DestroyedService,
        {
            provide: FD_DATA_SOURCE_TRANSFORMER,
            useClass: TableDataSourceParser
        }
    ]
})
export class TableDataSourceDirective<T> extends DataSourceDirective<T, TableDataSource<T>> implements OnDestroy {
    /** Event emitted when data loading is started. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDataReceived = new EventEmitter<void>();

    /** @hidden */
    set totalItems(value: number) {
        this.totalItems$.next(value);
    }

    get totalItems(): number {
        return this.totalItems$.value;
    }

    /** Total items count stream. */
    totalItems$ = new BehaviorSubject<number>(0);

    /** Items stream. */
    items$ = new BehaviorSubject<T[]>([]);

    /** @hidden for data source handling */
    private _tableDsSubscription: Subscription | null;

    /** @hidden */
    _tableDataSource: TableDataSource<T>;

    /** @hidden */
    private _table: Table;

    /** @hidden */
    _firstLoadingDone = false;

    /** @hidden */
    _internalLoadingState = false;

    /** @hidden */
    private readonly initialState = inject<TableInitialState>(FDP_TABLE_STATE_DIRECTIVE, {
        optional: true
    });

    /** @hidden */
    private readonly _tableService = inject(TableService);

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    initializeDataSource(): void {
        this.dataSourceChanged.pipe(startWith(true), takeUntil(this._destroy$)).subscribe(() => {
            this._closeDataSource();
            this._listenToDataSource();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._tableDsSubscription?.unsubscribe();
    }

    /** @hidden */
    setTable(table: Table): void {
        this._table = table;
    }

    /**
     * @hidden
     * This is a single point of data entry to the component. We don't want to set data on different
     * places. If any new data comes in, or you do a search, and you want to pass initial data
     * its here.
     */
    private _listenToDataSource(): void {
        this._tableDsSubscription?.unsubscribe();
        this._tableDsSubscription = new Subscription();

        const dataSourceStream = this.dataSourceProvider;
        if (dataSourceStream === undefined) {
            throw new Error(`[TableDataSource] source did not match an Array, Observable, nor DataSource`);
        }

        this._tableDsSubscription.add(
            this.dataChanged$.subscribe((items) => {
                // this._totalItems = dataSourceStream.dataProvider.totalItems;
                this.totalItems$.next(dataSourceStream.dataProvider.totalItems);
                this.items$.next(items);
            })
        );

        this._tableDsSubscription.add(
            dataSourceStream.onDataRequested().subscribe(() => {
                this.onDataRequested.emit();
                this._internalLoadingState = true;
                this._tableService.setTableLoading(this._table.loadingState);
            })
        );
        this._tableDsSubscription.add(
            dataSourceStream.onDataReceived().subscribe(() => {
                this.onDataReceived.emit();
                this._internalLoadingState = false;
                this._firstLoadingDone = true;
                this._tableService.setTableLoading(this._table.loadingState);

                // Restore normal pagination after the first fetch of data.
                if (this._table._loadPreviousPages) {
                    const state = this._tableService.getTableState();
                    this._tableService.setTableState({
                        ...state,
                        ...{
                            page: {
                                currentPage: this.initialState?.initialPage || state.page.currentPage,
                                pageSize: this._table.pageSize || state.page.pageSize
                            }
                        }
                    });
                    this._table._loadPreviousPages = false;
                }
            })
        );

        // initial data fetch
        dataSourceStream.fetch(this._tableService.getTableState());

        this._tableDataSource = dataSourceStream;
    }

    /** @hidden */
    private _closeDataSource(): void {
        if (!this._tableDataSource) {
            return;
        }

        this._tableDataSource.close();

        this._tableDsSubscription?.unsubscribe();
        this._tableDsSubscription = null;
    }
}

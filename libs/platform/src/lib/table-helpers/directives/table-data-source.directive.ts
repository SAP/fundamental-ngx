import { Directive, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { DataSourceDirective, FD_DATA_SOURCE_TRANSFORMER, isDataSource } from '@fundamental-ngx/cdk/data-source';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { FDP_TABLE_STATE_DIRECTIVE } from '../constants';
import { ChildTableDataSource, TableDataSource, TableDataSourceParser } from '../domain';
import { TableInitialState, TableRow } from '../models';
import { TableService } from '../services/table.service';
import { Table } from '../table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[fdpTableDataSource]',
    standalone: true,
    providers: [
        {
            provide: FD_DATA_SOURCE_TRANSFORMER,
            useClass: TableDataSourceParser
        }
    ]
})
export class TableDataSourceDirective<T> extends DataSourceDirective<T, TableDataSource<T>> implements OnDestroy {
    /**
     * Data source.
     * @param source
     */
    @Input()
    set childDataSource(source: ChildTableDataSource<T> | null) {
        this._childDataSource = source;
        this._initializeChildDataSource();
        this.childDataSourceChanged.next();
    }

    get childDataSource(): ChildTableDataSource<T> | null {
        return this._childDataSource;
    }

    /** Event emitted when child data source instance being changed. */
    @Output()
    childDataSourceChanged = new EventEmitter<void>();

    /** Event emitted when data loading is started. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDataReceived = new EventEmitter<void>();

    /** Total items count stream. */
    totalItems$ = new BehaviorSubject<number>(0);

    /** Items stream. */
    items$ = new BehaviorSubject<T[]>([]);

    /** Child items stream. */
    childItems$ = new Subject<Map<TableRow<T>, T[]>>();

    /** @hidden */
    _tableDataSource: TableDataSource<T>;

    /** @hidden */
    _firstLoadingDone = false;

    /** @hidden */
    _internalLoadingState = false;

    /** @hidden */
    _internalChildrenLoadingState = false;

    /** @hidden */
    private _childDataSource: ChildTableDataSource<T> | null;

    /** @hidden */
    private _childDsSubscription = new Subscription();

    /** @hidden */
    set totalItems(value: number) {
        this.totalItems$.next(value);
    }

    get totalItems(): number {
        return this.totalItems$.value;
    }

    /** @hidden for data source handling */
    private _tableDsSubscription: Subscription | null;

    /** @hidden */
    private _table: Table;

    /** @hidden */
    private readonly initialState = inject<TableInitialState>(FDP_TABLE_STATE_DIRECTIVE, {
        optional: true
    });

    /** @hidden */
    private readonly _tableService = inject(TableService);

    /** @hidden */
    initializeDataSource(): void {
        this.dataSourceChanged.pipe(startWith(true), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
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
     * Initializes the child data source to fetch child rows.
     */
    private _initializeChildDataSource(): void {
        if (isDataSource(this.childDataSource)) {
            this.childDataSource?.unsubscribe();

            this._childDsSubscription?.unsubscribe();
        }
        if (!this.childDataSource) {
            return;
        }

        this._childDsSubscription = new Subscription();

        this._childDsSubscription.add(
            this.childDataSource.onDataRequested().subscribe(() => {
                this._internalChildrenLoadingState = true;
                this._tableService.setTableLoading(this._table.loadingState);
            })
        );

        this._childDsSubscription.add(
            this.childDataSource.onDataReceived().subscribe(() => {
                this._internalChildrenLoadingState = false;
                this._tableService.setTableLoading(this._table.loadingState);
            })
        );

        this._childDsSubscription.add(
            this.childDataSource.dataLoading
                .pipe(
                    filter((state) => !!state),
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe((loadingStates) => {
                    loadingStates.forEach((state) => state.row?.childItemsLoading$.next(state.loading));
                })
        );

        this._childDsSubscription.add(
            this.childDataSource.dataChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((data) => {
                this.childItems$.next(data);
            })
        );
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

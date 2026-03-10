import { TableDataProvider, TableDataSource, TableState } from '@fundamental-ngx/platform';
import { Observable, Subject, takeUntil } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

export class CustomTableDataProvider<T> extends TableDataProvider<T> {
    protected items$ = new Observable<T[]>();

    public constructor(data$: Observable<T[]>) {
        super();
        this.items$ = data$;
    }

    public override fetch(tableState: TableState): Observable<T[]> {
        return this.items$.pipe(
            map((items) => {
                this.items = items;
                // Apply paging
                if (tableState.page.currentPage) {
                    const startIndex = (tableState.page.currentPage - 1) * tableState.page.pageSize;
                    this.items = items.slice(startIndex, startIndex + tableState.page.pageSize).map((x) => ({ ...x }));
                }
                this.totalItems = items.length;
                return this.items;
            })
        );
    }

    /**
     * Ensures consistency between `fetch()` and `fetchData()` across components.
     * Delegates to server-side `fetch()` to avoid local filtering by fetchData().
     * Example: Smart Filter Bar calls `fetchData()` expecting final filtered results.
     */
    public override fetchData(state: TableState): Observable<T[]> {
        return this.fetch(state).pipe(takeUntil(this._destroy$));
    }
}

export class CustomTableDataSource<T> extends TableDataSource<T> {
    private readonly _fetchTrigger$ = new Subject<TableState>();
    private _overlayLoading = false;

    public constructor(dataProvider: TableDataProvider<T>) {
        super(dataProvider);

        this._fetchTrigger$
            .pipe(
                tap(() => {
                    this._onDataRequested$.next(true);
                    this._dataLoading$.next(true);
                    this._dataLoading = true;
                }),
                switchMap((tableState) =>
                    this.dataProvider.fetchData(tableState).pipe(
                        tap((items) => {
                            this._onDataReceived$.next(true);
                            this._dataLoading = false;
                            this._dataLoading$.next(false);
                            this._dataChanges$.next(items);
                        }),
                        catchError((error) => {
                            this._onDataReceived$.next(false);
                            this._dataLoading = false;
                            this._dataLoading$.next(false);
                            this._dataChanges$.error([]);
                            return error;
                        })
                    )
                )
            )
            .subscribe();
    }

    public get isOverlayLoading(): boolean {
        return this._overlayLoading;
    }

    public setOverlayLoading(isLoading: boolean): void {
        this._overlayLoading = isLoading;
        this._dataLoading$.next(this._dataLoading || this._overlayLoading);
    }

    public override fetch(tableState: TableState): void {
        this._fetchTrigger$.next(tableState);
    }

    public reset(): void {
        this._dataChanges$.next([]);
        this._dataLoading$.next(true);
        this._dataLoading = true;
    }
}

import { DestroyRef, Directive, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { isDataSource } from './helpers/is-datasource';
import { DataSource, DataSourceParser, DataSourceProvider } from './models';
import { FD_DATA_SOURCE_TRANSFORMER } from './tokens';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[fdkDataSource]',
    standalone: true
})
export class DataSourceDirective<T = any, P extends DataSourceProvider<T> = DataSourceProvider<T>>
    implements OnDestroy
{
    /**
     * Emits when the data source object has been changed.
     */
    @Output()
    readonly dataSourceChanged = new EventEmitter<void>();

    /**
     * Event emitted when datasource content has been changed.
     */
    @Output()
    readonly dataChanged = new EventEmitter<T[]>();

    /**
     * Event emitted when data provider loading state has been changed.
     */
    @Output()
    readonly isLoading = new EventEmitter<boolean>();

    /**
     * Data source.
     * @param source
     */
    @Input()
    set dataSource(source: DataSource<T, P> | null) {
        this._dataSource = source;
        this._initializeDataSource();
        this.dataSourceChanged.next();
    }

    get dataSource(): DataSource<T, P> | null {
        return this._dataSource;
    }

    /** @hidden */
    dataSourceProvider: P | undefined;

    /**
     * Data stream. Emits when new data retrieved.
     */
    readonly dataChanged$ = new BehaviorSubject<T[]>([]);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _dataSource: DataSource<T, P> | null;

    /** @hidden */
    private _dsSubscription = new Subscription();

    /** @hidden */
    private readonly _dataSourceTransformer = inject<DataSourceParser<T, P>>(FD_DATA_SOURCE_TRANSFORMER);

    /** @hidden */
    ngOnDestroy(): void {
        this.dataSourceProvider?.unsubscribe();
        this._dsSubscription?.unsubscribe();
    }

    /** @Hidden */
    protected _toDataStream(source: DataSource<T> | null): P | undefined {
        return !source
            ? undefined
            : this._dataSourceTransformer
            ? this._dataSourceTransformer.parse(source)
            : undefined;
    }

    /** @hidden */
    private _initializeDataSource(): void {
        if (isDataSource(this.dataSource)) {
            this.dataSourceProvider?.unsubscribe();

            this._dsSubscription?.unsubscribe();
        }
        // Convert whatever comes in as DataSource, so we can work with it identically
        this.dataSourceProvider = this._toDataStream(this.dataSource);

        if (!this.dataSourceProvider) {
            return;
        }

        this._dsSubscription = new Subscription();

        this._dsSubscription.add(
            this.dataSourceProvider.dataLoading
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe((isLoading) => this.isLoading.emit(isLoading))
        );

        this._dsSubscription.add(
            this.dataSourceProvider.dataChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((data) => {
                this.dataChanged.emit(data);
                this.dataChanged$.next(data);
            })
        );
    }
}

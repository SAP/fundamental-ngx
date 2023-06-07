import { Directive, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isDataSource } from './helpers/is-datasource';
import { DataSource, DataSourceParser, DataSourceProvider } from './models';
import { FD_DATA_SOURCE_TRANSFORMER } from './tokens';

@Directive({
    selector: '[fdkDataSource]',
    standalone: true,
    providers: [DestroyedService]
})
export class DataSourceDirective<T = any, P extends DataSourceProvider<T> = DataSourceProvider<T>>
    implements OnDestroy
{
    /**
     * Data source.
     * @param source
     */
    @Input()
    set dataSource(source: DataSource<T, P>) {
        this._dataSource = source;
        this.dataSourceChanged.next();

        this._initializeDataSource();
    }

    get dataSource(): DataSource<T, P> {
        return this._dataSource;
    }

    /** @hidden */
    private _dataSource: DataSource<T, P>;

    /** @hidden */
    dataSourceProvider: P | undefined;

    /** @hidden */
    private _dsSubscription = new Subscription();

    /**
     * Data stream. Emits when new data retrieved.
     */
    readonly dataChanged$ = new BehaviorSubject<T[]>([]);

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

    /** @hidden */
    constructor(
        private readonly _destroyed$: DestroyedService,
        @Inject(FD_DATA_SOURCE_TRANSFORMER) private readonly _dataSourceTransformer: DataSourceParser<T, P>
    ) {}

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
                .pipe(takeUntil(this._destroyed$))
                .subscribe((isLoading) => this.isLoading.emit(isLoading))
        );

        this._dsSubscription.add(
            this.dataSourceProvider.dataChanges.pipe(takeUntil(this._destroyed$)).subscribe((data) => {
                this.dataChanged.emit(data);
                this.dataChanged$.next(data);
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.dataSourceProvider?.unsubscribe();
        this._dsSubscription?.unsubscribe();
    }

    /** @Hidden */
    private _toDataStream(source: DataSource<T>): P | undefined {
        return this._dataSourceTransformer ? this._dataSourceTransformer.parse(source) : undefined;
    }
}

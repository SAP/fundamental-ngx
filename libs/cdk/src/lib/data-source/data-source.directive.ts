import { Directive, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isDataSource } from './helpers/is-datasource';
import { DataSource, DataSourceParser, DataSourceProvider } from './models/data-source';
import { FD_DATA_SOURCE_TRANSFORMER } from './tokens';

@Directive({
    selector: '[fdDataSource]',
    standalone: true,
    providers: [DestroyedService]
})
export class DataSourceDirective<T = any, P extends DataSourceProvider<T> = DataSourceProvider<T>> {
    /**
     * Data source.
     * @param source
     */
    @Input()
    set dataSource(source: DataSource<T>) {
        this._dataSource = source;
        this.dataSourceChanged.next();

        this._initializeDataSource(this._dataSource);
    }

    get dataSource(): DataSource<T> {
        return this._dataSource;
    }

    /** @hidden */
    private _dataSource: DataSource<T>;

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
    readonly dataSourceChanged = new Subject<void>();

    /**
     * Event emitted when datasource content has been changed.
     */
    @Output()
    dataChanged = new EventEmitter<T[]>();

    /** @hidden */
    constructor(
        private readonly _destroyed$: DestroyedService,
        @Inject(FD_DATA_SOURCE_TRANSFORMER) private readonly _dataSourceTransformer: DataSourceParser<T, P>
    ) {}

    /** @hidden */
    private _initializeDataSource(ds: DataSource<T>): void {
        if (isDataSource(this.dataSource)) {
            this.dataSourceProvider?.close();

            this._dsSubscription?.unsubscribe();
        }
        // Convert whatever comes in as DataSource, so we can work with it identically
        this.dataSourceProvider = this._toDataStream(ds);

        if (!this.dataSourceProvider) {
            return;
        }

        this._dsSubscription = new Subscription();

        this._dsSubscription.add(
            this.dataSourceProvider
                .open()
                .pipe(takeUntil(this._destroyed$))
                .subscribe((data) => {
                    this.dataChanged.emit(data);
                    this.dataChanged$.next(data);
                })
        );
    }

    /** @Hidden */
    private _toDataStream(source: DataSource<T>): P | undefined {
        return this._dataSourceTransformer ? this._dataSourceTransformer(source) : undefined;
    }
}

import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk';
import {
    DataSourceDirective,
    DataSourceParser,
    BaseDataSource,
    BaseDataProvider,
    DataProvider,
    isDataSource,
    FD_DATA_SOURCE_TRANSFORMER
} from '@fundamental-ngx/cdk/data-source';
import { delay, isObservable, Observable, of, takeUntil } from 'rxjs';

export class ExampleDataSource<T> extends BaseDataSource<T> {
    limitless = false;
    constructor(public dataProvider: BaseDataProvider<T>) {
        super(dataProvider);
    }
}

export class ArrayExampleDataSource<T> extends ExampleDataSource<T> {
    limitless = true;
    /** @hidden */
    constructor(data: T[]) {
        super(new DataProvider(data));
    }
}

export class ObservableExampleDataSource<T> extends ExampleDataSource<T> {
    limitless = false;
    /** @hidden */
    constructor(data: Observable<T[]>) {
        super(new DataProvider(data));
    }
}

/**
 * Type of acceptable objects as a datasource for the Multi-Combo Box component.
 */
export type ExampleAcceptableDataSource<T> = ExampleDataSource<T> | Observable<T[]> | T[];

export class ExampleDataSourceParser<T> implements DataSourceParser<T, ExampleDataSource<T>> {
    parse(source: ExampleAcceptableDataSource<T>): ExampleDataSource<T> | undefined {
        if (isDataSource(source)) {
            return source as ExampleDataSource<T>;
        }

        if (Array.isArray(source)) {
            return new ArrayExampleDataSource<T>(source);
        }

        if (isObservable(source)) {
            return new ObservableExampleDataSource<T>(source);
        }

        return undefined;
    }
}

@Component({
    selector: 'fundamental-ngx-data-source-default-example',
    templateUrl: './data-source-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: DataSourceDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['dataSource'],
            // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property
            outputs: ['dataChanged']
        }
    ],
    providers: [
        DestroyedService,
        {
            provide: FD_DATA_SOURCE_TRANSFORMER,
            useClass: ExampleDataSourceParser<number>
        }
    ]
})
export class DataSourceDefaultExampleComponent implements OnInit {
    arrayDataSource = new Array(20).fill(null).map((_v, i) => i);

    currentData: number[] = [];

    dataSourceOptions = ['array', 'observable', 'class'];

    currentDataSource: 'array' | 'observable' | 'class' = 'array';

    isLoading = false;

    constructor(
        private readonly _destroy$: DestroyedService,
        private readonly _cd: ChangeDetectorRef,
        public readonly dataSourceDirective: DataSourceDirective<number>
    ) {}

    ngOnInit(): void {
        this.dataSourceDirective.dataSource = this.arrayDataSource;

        this.dataSourceDirective.dataChanged$.pipe(takeUntil(this._destroy$)).subscribe((data) => {
            this.currentData = data;
            this._cd.detectChanges();
        });

        this.dataSourceDirective.isLoading.pipe(takeUntil(this._destroy$)).subscribe((isLoading) => {
            this.isLoading = isLoading;
            this._cd.detectChanges;
        });
    }

    changeDataSource(source: 'array' | 'observable' | 'class'): void {
        switch (source) {
            case 'array':
                this.dataSourceDirective.dataSource = this.arrayDataSource;
                break;
            case 'observable':
                this.dataSourceDirective.dataSource = of(this.arrayDataSource).pipe(delay(3000));
                break;
            case 'class':
                this.dataSourceDirective.dataSource = new ExampleDataSource(new DataProvider(this.arrayDataSource));
                break;
        }
    }
}

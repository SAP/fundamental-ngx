import {
    AbstractDataProvider,
    BaseDataSource,
    DataProvider,
    DataSourceParser,
    isDataSource
} from '@fundamental-ngx/cdk/data-source';
import { Observable, isObservable } from 'rxjs';

export type NavigationDataSourceItem<T extends Record<string, any> = Record<string, any>> = {
    placement: 'start' | 'end';
    children?: NavigationDataSourceItem<T>[];
} & T;

export class FdbNavigationDataSource<T extends NavigationDataSourceItem> extends BaseDataSource<T> {
    /** @hidden */
    limitless = true;
    /** @hidden */
    constructor(public dataProvider: AbstractDataProvider<T>) {
        super(dataProvider);
    }
}

export class ArrayNavigationDataSource<T extends NavigationDataSourceItem> extends FdbNavigationDataSource<T> {
    /** @hidden */
    constructor(data: T[]) {
        super(new DataProvider(data));
    }
}

export class ObservableNavigationDataSDataSource<
    T extends NavigationDataSourceItem
> extends FdbNavigationDataSource<T> {
    /** @hidden */
    constructor(data: Observable<T[]>) {
        super(new DataProvider(data));
    }
}

/**
 * Type of acceptable objects as a datasource for the Navigation component.
 */
export type FdbNavigationDataSAcceptableDataSource<T extends NavigationDataSourceItem> =
    | FdbNavigationDataSource<T>
    | Observable<T[]>
    | T[];

export class NavigationDataSourceParser<T extends NavigationDataSourceItem>
    implements DataSourceParser<T, FdbNavigationDataSource<T>>
{
    /**
     * Transforms plain array or observable into DataSource class.
     * @param source
     */
    parse(source: FdbNavigationDataSAcceptableDataSource<T>): FdbNavigationDataSource<T> | undefined {
        if (isDataSource(source)) {
            return source as FdbNavigationDataSource<T>;
        }

        if (Array.isArray(source)) {
            return new ArrayNavigationDataSource<T>(source);
        }

        if (isObservable(source)) {
            return new ObservableNavigationDataSDataSource<T>(source);
        }

        return undefined;
    }
}

/**
 *
 * When working with large set of data using components such as:
 *  - Datatables
 *  - InputSearch
 *  - ComboBox (Autocomplete)
 *  - Tree
 *  - List
 *  - etc..
 *  and for these we need to unify the way we access a data. Currently we leave most of the complex
 *  data access or data manipulation on application developer which leads to different
 *  implementation approaches and allot of code duplication.
 *
 *  It is common practice when working with different data input sources we try to apply some
 *  Design patterns e.g. Adapter Pattern that provides us with guidelines how different interfaces
 *  can talk to each other and from here we can derive another pattern so called Datasource pattern
 *  which is high-level architectural pattern to abstract data and internal resources
 *  access (DB calls, Rest calls, domain objects) with a mininal amount a code.
 *
 * What we want to achieve is to define abstract layer where each specific resource type needs to
 * implement and move all the related logic into reusable DataSources. (TableDataSource,
 * ComboBoxDataSource, ... )
 *
 * Observable<T[]> is a reactive stream, that changes its content based on what it pushed
 * into it using .next().
 *
 * Each type of data component such Autocomplete, DataTable, List,.. needs to provide its own
 * specific implementation to handle specific use-case.
 *
 * ```
 *  export abstract class DataTableDataSource<T> implements DataSource<T> {
 *    data: T[];
 *    filterTerm: string;
 *    paginator: Paginator | null
 *
 *    filterPredicate: ((data: T, filter: string) => boolean;
 *
 *    sortData: ((data: T[], sort: Sort) => T[]);
 *
 *    //
 *    create (t: T): T;
 *    update (t: T): T;
 *    remove (t: T): T;
 *
 *  }
 * ```
 *
 * After we define a format we can start creating concrete implementations based on the usage or
 * resource .e.g:
 *
 *
 * ```
 * export abstract class RestAutoCompleteDataSource<T> extend DataChooserDataSource <T> {
 *   // We can use a registry that is able to map a Entity Type = Endpoint
 *   // have identical way how to fetch , search ,...
 * }
 * ```
 *
 * Probably when working with data only locally, it can be:
 *
 * ```
 * export abstract class LocalArrayAutoCompleteDataSource<T> extend DataChooserDataSource <T> {
 * }
 * ```
 *
 *
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MatchingStrategy } from '../components/form/combobox/combobox.config';

export const DATA_PROVIDERS = new InjectionToken<Map<string, DataProvider<any>>>('DataProviderRegistry');

export interface DataSource<T> {
    open(): Observable<T[]>;

    close(): void;
}

export type MatchBy = (item: any) => any;

export interface MatchingBy {
    firstBy: MatchBy;
    secondaryBy?: MatchBy;
}

export function isDataSource(value: any): value is DataSource<any> {
    return value && typeof value.open === 'function';
}

/**
 * Provider is a data driver that can access data and retrieve them. It knows how to get 1
 * or more records, maybe do paging and some other things.
 *
 */
export abstract class DataProvider<T> {
    protected _keyPath: string;
    protected _matchingStrategy: MatchingStrategy = MatchingStrategy.STARTS_WITH;
    protected _matchingBy: MatchingBy | null = null;

    abstract fetch(params: Map<string, any>): Observable<T[]>;

    /**
     * Tells if this DataProvider supports INSERT, REMOVE
     *
     */
    canCRUD(): boolean {
        return false;
    }

    /**
     * Implement to support CRUD operations.
     *
     */
    insert(obj: any): void {
        throw new Error('Not supported');
    }

    remove(obj: any): void {
        throw new Error('Not supported');
    }

    update(obj: any): void {
        throw new Error('Not supported');
    }

    setLookupKey(key: string): void {
        this._keyPath = key;
    }

    setMatchingBy(matchingBy: MatchingBy): void {
        this._matchingBy = matchingBy;
    }

    setMatchingStrategy(strategy: MatchingStrategy): void {
        this._matchingStrategy = strategy;
    }
}

export class ComboBoxDataSource<T> implements DataSource<T> {
    static readonly MaxLimit = 5;
    protected dataChanges: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    constructor(public dataProvider: DataProvider<any>) { }

    match(predicate?: string | Map<string, string>): void {
        const searchParam = new Map();

        if (typeof predicate === 'string') {
            searchParam.set('query', predicate);
        } else if (predicate instanceof Map) {
            predicate.forEach((v, k) => searchParam.set(k, v));
        } else {
            throw new Error('DataSource.match() predicate can only accepts string and Map');
        }

        if (!searchParam.has('limit')) {
            searchParam.set('limit', ComboBoxDataSource.MaxLimit);
        }

        this.dataProvider.fetch(searchParam).subscribe((result: T[]) => {
            this.dataChanges.next(result);
        });
    }

    open(): Observable<T[]> {
        return this.dataChanges.asObservable();
    }

    close(): void { }
}

export class MultiComboBoxDataSource<T> extends ComboBoxDataSource<T> {
    constructor(public dataProvider: DataProvider<any>) {
        super(dataProvider);
    }
}

export class SearchFieldDataSource<T> extends ComboBoxDataSource<T> {
    constructor(public dataProvider: DataProvider<any>) {
        super(dataProvider);
    }
}

export class ListDataSource<T> extends ComboBoxDataSource<T> {
    constructor(public dataProvider: DataProvider<any>) {
        super(dataProvider);
    }
    // sort

    sort(listItems: [] | Map<string, string>): void {
        const sortedItems = new Map();

        if (listItems instanceof Array) {
            sortedItems.set('query', listItems.sort);
        } else if (listItems instanceof Map) {
            this.sortMap(listItems).forEach((v, k) => sortedItems.set(k, v));
        } else {
            throw new Error('DataSource.sort() listItem can only accepts array and Map');
        }
        sortedItems.set('query', listItems);
        this.dataProvider.fetch(sortedItems).subscribe((result: T[]) => {
            this.dataChanges.next(result);
        });
    }

    // filter
    match(predicate?: string | Map<string, string> | []): void {
        const searchParam = new Map();

        if (typeof predicate === 'string') {
            searchParam.set('query', predicate);
        } else if (predicate instanceof Map) {
            predicate.forEach((v, k) => searchParam.set(k, v));
        } else {
            throw new Error('DataSource.match() predicate can only accepts string and Map');
        }

        if (!searchParam.has('limit')) {
            searchParam.set('limit', ListDataSource.MaxLimit);
        }

        this.dataProvider.fetch(searchParam).subscribe((result: T[]) => {
            this.dataChanges.next(result);
        });
    }

    sortMap(list: any): any {
        const keys: string[] = Object.keys(list);
        const sortedKeys = keys.sort(); // reverse if you need or not
        const sortedList: any = {};
        sortedKeys.forEach(x => {
            sortedList[x] = list[x];
        });
        return sortedList;
    }
}


import { BehaviorSubject, Observable } from 'rxjs';

import { TableDataSource } from './table-data-source';
import { TableDataProvider } from './table-data-provider';
import { TableState } from '../interfaces/table-state.interface';
import { map } from 'rxjs/operators';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';

/**
 * Table Data Provider based on an array.
 *
 * Used to convert array source to the TableDataProvider interface.
 *
 */
export class ArrayTableDataProvider<T> extends TableDataProvider<T> {
    /** @hidden */
    protected items$ = new BehaviorSubject<T[]>([]);

    /** @hidden */
    constructor(items: T[], dateTimeAdapter?: DatetimeAdapter<any>) {
        super();
        this.items = items;
        this.totalItems = this.items.length;
        this.items$.next(this.items);
        this.dateTimeAdapter = dateTimeAdapter;
    }

    /**
     * Method for retrieving the data.
     * @param tableState @see TableState Set of table parameters.
     * @returns Observable with data.
     */
    fetch(state?: TableState): Observable<T[]> {
        return this.items$.asObservable().pipe(
            map((items) => {
                if (state?.searchInput) {
                    items = this.search(items, state);
                }

                if (state?.filterBy) {
                    items = this.applyFiltering(items, state.filterBy);
                }

                this.totalItems = items.length;

                return items;
            })
        );
    }
}

export class ArrayTableDataSource<T> extends TableDataSource<T> {
    /** @hidden */
    constructor(data: T[], dateTimeAdapter?: DatetimeAdapter<any>) {
        super(new ArrayTableDataProvider(data, dateTimeAdapter));
    }
}

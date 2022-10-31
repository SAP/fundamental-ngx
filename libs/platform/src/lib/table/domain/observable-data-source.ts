import { Observable } from 'rxjs';

import { TableDataSource } from './table-data-source';
import { TableDataProvider } from './table-data-provider';
import { TableState } from '../interfaces/table-state.interface';
import { map } from 'rxjs/operators';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';

/**
 * Table Data Provider based on an Observable.
 *
 * Used to convert observable source to the TableDataProvider interface.
 *
 */
export class ObservableTableDataProvider<T> extends TableDataProvider<T> {
    /** @hidden */
    protected items$: Observable<T[]>;

    /** @hidden */
    constructor(items$: Observable<T[]>, dateTimeAdapter?: DatetimeAdapter<any>) {
        super();
        this.items$ = items$;
        this.dateTimeAdapter = dateTimeAdapter;
    }

    /**
     * Method for retrieving the data.
     * @param tableState @see TableState Set of table parameters.
     * @returns Observable with data.
     */
    fetch(state?: TableState): Observable<T[]> {
        return this.items$.pipe(
            map((items) => {
                this.items = items;
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

export class ObservableTableDataSource<T> extends TableDataSource<T> {
    /** @hidden */
    constructor(data: Observable<T[]>, dateTimeAdapter?: DatetimeAdapter<any>) {
        super(new ObservableTableDataProvider(data, dateTimeAdapter));
    }
}

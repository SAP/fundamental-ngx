/**
 * Default implementation for Arrays.
 */
import { BaseDataProvider } from './base-data-provider';
import { ComboBoxDataSource, ListDataSource, MultiComboBoxDataSource, MultiInputDataSource } from './data-source';

export class ArrayComboBoxDataSource<T> extends ComboBoxDataSource<T> {
    /** @hidden */
    constructor(private data: T[]) {
        super(new BaseDataProvider(data));
    }
}

export class ArrayMultiComboBoxDataSource<T> extends MultiComboBoxDataSource<T> {
    /** @hidden */
    constructor(private data: T[]) {
        super(new BaseDataProvider(data));
    }
}

export class ArrayListDataSource<T> extends ListDataSource<T> {
    /** @hidden */
    constructor(private data: T[]) {
        super(new BaseDataProvider(data));
    }
}

export class ArrayMultiInputDataSource<T> extends MultiInputDataSource<T> {
    /** @hidden */
    constructor(private data: T[]) {
        super(new BaseDataProvider(data));
    }
}

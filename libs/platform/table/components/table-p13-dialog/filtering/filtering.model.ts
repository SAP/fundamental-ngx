import {
    CollectionFilter,
    FilterableColumnDataType,
    FilterStrategy,
    getFilterStrategiesBasedOnDataType,
    TableDialogCommonData
} from '@fundamental-ngx/platform/table-helpers';

export interface FilterableColumn {
    label: string;
    key: string;
    dataType: FilterableColumnDataType;
    filterable?: boolean;
    filterValuesOptions?: string[]; // add optional filterValuesOptions
}

export interface FilterDialogData extends TableDialogCommonData {
    collectionFilter: CollectionFilter[];
    columns: FilterableColumn[];
    validator?: ((rules: CollectionFilter[]) => boolean) | undefined;
}

export interface FilterDialogResultData {
    collectionFilter: CollectionFilter[];
}

/**
 * Filter Rule
 *
 * represents one rule per row
 */

export class FilterRule<T = any> {
    /** Validation flg */
    isValid = false;

    /** Available strategies options */
    strategies: ReadonlyArray<FilterStrategy> = [];

    /** Data type */
    dataType?: FilterableColumnDataType;

    /** Available filter Options */
    filterValuesOptions: string[] = [];

    /** returns whether filter rule has value */
    get hasValue(): boolean {
        return this.valueExists(this.value) || this.valueExists(this.value2);
    }

    /** @hidden */
    constructor(
        readonly columns: ReadonlyArray<FilterableColumn>,
        /** Column key the rule belongs to */
        public columnKey?: string,
        /** Data type */
        public strategy?: FilterStrategy,
        /** Main filter value */
        public value?: T | null,
        /** Additional filter value */
        public value2?: T | null
    ) {
        if (!this.columnKey) {
            this.setColumnKey(columns[0]?.key);
        }
        if (!this.dataType) {
            this.setDataTypeByColumnKey(this.columnKey);
        }
        if (this.strategies.length === 0) {
            this.setStrategiesByColumnKey(this.columnKey);
        }
        if (this.filterValuesOptions.length === 0) {
            this.setFilterValuesOptionsByColumnKey(this.columnKey);
        }
    }

    /** @hidden */
    setValid(isValid: boolean): void {
        this.isValid = isValid;
    }

    /** @hidden */
    setValue(value: T | null): void {
        this.value = value;
    }

    /** @hidden */
    setValue2(value: T | null): void {
        this.value2 = value;
    }

    /** @hidden */
    setStrategy(strategy: FilterStrategy): void {
        this.strategy = strategy;
    }

    /** @hidden */
    setStrategiesByColumnKey(columnKey?: string): void {
        const dataType = this.columns.find((column) => column.key === columnKey)?.dataType;
        if (!dataType) {
            return;
        }

        const strategies = getFilterStrategiesBasedOnDataType(dataType);

        if (this.strategies === strategies) {
            return;
        }

        this.strategies = strategies;

        if (!this.strategies.includes(this.strategy!)) {
            this.setStrategy(strategies[0]);
        }
    }

    /** @hidden */
    setColumnKey(columnKey: string): void {
        if (columnKey === this.columnKey) {
            return;
        }
        this.columnKey = columnKey;

        // reset values
        this.setValue(null);
        this.setValue2(null);

        // update data type
        this.setDataTypeByColumnKey(columnKey);

        // update available Filter options
        this.setFilterValuesOptionsByColumnKey(columnKey);

        // update available strategies list
        this.setStrategiesByColumnKey(columnKey);
    }

    /** @hidden */
    setDataTypeByColumnKey(columnKey?: string): void {
        const dataType = this.columns.find((column) => column.key === columnKey)?.dataType;

        if (dataType === this.dataType) {
            return;
        }
        this.dataType = dataType;
    }

    /** @hidden */
    setFilterValuesOptionsByColumnKey(columnKey?: string): void {
        const filterValuesOptions = this.columns.find((column) => column.key === columnKey)?.filterValuesOptions;
        if (this.areArraysEqual(filterValuesOptions, this.filterValuesOptions)) {
            return;
        }
        this.filterValuesOptions = filterValuesOptions ? filterValuesOptions : [];
    }

    /** @hidden */
    private valueExists(value: any): boolean {
        return !!value || value === 0 || typeof value === 'boolean';
    }

    /** @hidden */
    private areArraysEqual(arr1: undefined | string[], arr2: undefined | string[]): boolean {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }
}

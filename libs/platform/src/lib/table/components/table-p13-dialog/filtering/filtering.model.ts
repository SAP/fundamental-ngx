import { CollectionFilter } from '../../../interfaces/collection-filter.interface';
import { FilterStrategy, getFilterStrategiesBasedOnDataType } from '../../../enums/collection-filter.enum';
import { FilterableColumnDataType } from '../../../enums/filter-type.enum';
import { TableDialogCommonData } from '../../../models/table-dialog-common-data.model';

export interface FilterableColumn {
    label: string;
    key: string;
    dataType: FilterableColumnDataType;
}

export interface FilterDialogData extends TableDialogCommonData {
    collectionFilter: CollectionFilter[];
    columns: FilterableColumn[];
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

    /** returns whether filter rule has value */
    get hasValue(): boolean {
        return this.valueExists(this.value) || this.valueExists(this.value2);
    }

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
    }

    setValid(isValid: boolean): void {
        this.isValid = isValid;
    }

    setValue(value: T | null): void {
        this.value = value;
    }

    setValue2(value: T | null): void {
        this.value2 = value;
    }

    setStrategy(strategy: FilterStrategy): void {
        this.strategy = strategy;
    }

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

        // update available strategies list
        this.setStrategiesByColumnKey(columnKey);
    }

    setDataTypeByColumnKey(columnKey?: string): void {
        const dataType = this.columns.find((column) => column.key === columnKey)?.dataType;

        if (dataType === this.dataType) {
            return;
        }

        this.dataType = dataType;
    }

    private valueExists(value: any): boolean {
        return !!value || value === 0;
    }
}

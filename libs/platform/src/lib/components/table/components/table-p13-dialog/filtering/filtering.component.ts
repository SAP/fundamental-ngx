import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { CollectionFilter } from '../../../interfaces';
import { FilterStrategy, FilterableColumnDataType, getFilterStrategiesBasedOnDataType } from '../../../enums';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

export interface FilterableColumn {
    label: string;
    key: string;
    dataType: FilterableColumnDataType;
}

export interface FilterDialogData {
    collectionFilter: CollectionFilter[];
    columns: FilterableColumn[];
}

export interface FilterDialogResultData {
    collectionFilter: CollectionFilter[];
}

export class FilterRule<T = any> {
    /** Validation flg */
    isValid = false;

    /** Available strategies options */
    strategies: ReadonlyArray<FilterStrategy> = [];

    /** Data type */
    dataType: FilterableColumnDataType;

    constructor(
        readonly columns: ReadonlyArray<FilterableColumn>,
        /** Column key the rule belongs to */
        public columnKey?: string,
        /** Data type */
        public strategy?: FilterStrategy,
        /** Main filter value */
        public value?: T,
        /** Additional filter value */
        public value2?: T
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

    setValue(value: T): void {
        this.value = value;
    }

    setValue2(value: T): void {
        this.value2 = value;
    }

    setStrategy(strategy: FilterStrategy): void {
        this.strategy = strategy;
    }

    setStrategiesByColumnKey(columnKey: string): void {
        const dataType = this.columns.find((column) => column.key === columnKey)?.dataType;
        const strategies = getFilterStrategiesBasedOnDataType(dataType);

        if (this.strategies === strategies) {
            return;
        }

        this.strategies = strategies;

        if (!this.strategies.includes(this.strategy)) {
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

    setDataTypeByColumnKey(columnKey: string): void {
        const dataType = this.columns.find((column) => column.key === columnKey).dataType;

        if (dataType === this.dataType) {
            return;
        }

        this.dataType = dataType;
    }
}

@Component({
    templateUrl: './filtering.component.html',
    styleUrls: ['./filtering.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13FilteringComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class P13FilteringComponent implements Resettable {
    /** Table columns available for filtering */
    readonly columns: FilterableColumn[] = [];

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** Initial filterBy collection */
    initialCollectionFilter: CollectionFilter[];

    /** Include Rules */
    includeRules: FilterRule[] = [];

    /** Exclude Rules */
    excludeRules: FilterRule[] = [];

    /** Count of valid included rules */
    validIncludeRulesCount = 0;
    /** Count of valid excluded rules */
    validExcludeRulesCount = 0;

    includePanelExpanded = true;

    excludePanelExpanded = false;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        const { columns, collectionFilter }: FilterDialogData = this.dialogRef.data;

        this.initialCollectionFilter = [...collectionFilter];

        this.columns = columns || [];

        this._initiateRules();

        this._calculateValidRulesCount();

        if (this.validExcludeRulesCount && !this.validIncludeRulesCount) {
            this.excludePanelExpanded = true;
        }
    }

    /** Reset changes to the initial state */
    reset(): void {
        this._initiateRules();
        this._isResetAvailableSubject$.next(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const includeFilters = this._getCollectionFiltersFromIncludeRules();
        const excludeFilters = this._getCollectionFiltersFromExcludeRules();

        const result: FilterDialogResultData = { collectionFilter: [...includeFilters, ...excludeFilters] };

        this.dialogRef.close(result);
    }

    /** @hidden */
    _removeRule(rule: FilterRule, rules: FilterRule[]): void {
        const index = rules.indexOf(rule);

        if (index === -1) {
            return;
        }

        rules.splice(index, 1);

        // Keep at least one item in the list
        if (rules.length === 0) {
            rules.push(new FilterRule(this.columns));
        }

        this._onModelChange();

        this._calculateValidRulesCount();
    }

    /** @hidden */
    _addNewRule(rules: FilterRule[]): void {
        const lastRule = rules.slice(-1)[0];
        rules.push(new FilterRule(this.columns, lastRule?.columnKey, lastRule?.strategy));
    }

    /** @hidden */
    _onModelChange(): void {
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _onRuleStateChange(): void {
        this._calculateValidRulesCount();
    }

    /** @hidden */
    private _initiateRules(): void {
        this.includeRules = this._createRules(this.initialCollectionFilter.filter(({ exclude }) => !exclude));
        this.excludeRules = this._createRules(this.initialCollectionFilter.filter(({ exclude }) => exclude));

        [this.includeRules, this.excludeRules].forEach((rules) => {
            // Rules on initial phase are considered as valid
            rules.forEach((rule) => rule.setValid(true));
            // Keep at least one item in the list
            if (rules.length === 0) {
                rules.push(new FilterRule(this.columns));
            }
        });
    }

    /** @hidden */
    private _createRules(collectionFilter: CollectionFilter[] = []): FilterRule[] {
        return collectionFilter.map(
            ({ field, value, value2, strategy }): FilterRule =>
                new FilterRule(this.columns, field, strategy, value, value2)
        );
    }

    /** @hidden */
    private _getCollectionFiltersFromRules(rules: FilterRule[]): CollectionFilter[] {
        return rules.filter(this._isRuleValid).map(
            ({ columnKey, strategy, value, value2 }): CollectionFilter => ({
                field: columnKey,
                value: value,
                value2: value2,
                strategy: strategy,
                exclude: null
            })
        );
    }

    /** @hidden */
    private _getCollectionFiltersFromIncludeRules(): CollectionFilter[] {
        return this._getCollectionFiltersFromRules(this.includeRules).map(
            (collectionFilter): CollectionFilter => ({
                ...collectionFilter,
                exclude: false
            })
        );
    }

    /** @hidden */
    private _getCollectionFiltersFromExcludeRules(): CollectionFilter[] {
        return this._getCollectionFiltersFromRules(this.excludeRules).map(
            (collectionFilter): CollectionFilter => ({
                ...collectionFilter,
                exclude: true
            })
        );
    }

    /** @hidden */
    private _calculateValidRulesCount = (): void => {
        this.validIncludeRulesCount = this.includeRules.filter(this._isRuleValid).length;
        this.validExcludeRulesCount = this.excludeRules.filter(this._isRuleValid).length;
    };

    /** @hidden */
    private _isRuleValid = (rule: FilterRule): boolean => rule?.isValid;
}

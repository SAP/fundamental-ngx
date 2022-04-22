import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { CollectionFilter } from '../../../interfaces';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

import { FilterDialogData, FilterDialogResultData, FilterableColumn, FilterRule } from './filtering.model';

export { FilterDialogData, FilterDialogResultData };

@Component({
    templateUrl: './filtering.component.html',
    styleUrls: ['./filtering.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13FilteringDialogComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class P13FilteringDialogComponent implements Resettable {
    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** Table columns available for filtering */
    readonly columns: FilterableColumn[] = [];

    /**
     * @hidden
     * Include Rules
     */
    _includeRules: FilterRule[] = [];

    /**
     * @hidden
     * Exclude Rules
     */
    _excludeRules: FilterRule[] = [];

    /**
     * @hidden
     * Count of valid included rules
     */
    _validIncludeRulesCount = 0;

    /**
     * @hidden
     * Count of valid excluded rules
     */
    _validExcludeRulesCount = 0;

    /**
     * @hidden
     * Panel opened/closed flag
     */
    _includePanelExpanded = true;

    /**
     * @hidden
     * Panel opened/closed flag
     */
    _excludePanelExpanded = false;

    /** @hidden */
    constructor(public dialogRef: DialogRef<FilterDialogData>) {
        const { columns, collectionFilter } = this.dialogRef.data;

        this.columns = columns || [];

        this._initiateRules(collectionFilter);

        this._calculateValidRulesCount();

        this._excludePanelExpanded = this._validExcludeRulesCount > 0;

        this._recalculateResetAvailability();
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

        this._recalculateResetAvailability();

        this._calculateValidRulesCount();
    }

    /** @hidden */
    _addNewRule(rules: FilterRule[]): void {
        const lastRule = rules.slice(-1)[0];
        rules.push(new FilterRule(this.columns, lastRule?.columnKey, lastRule?.strategy));
    }

    /** @hidden */
    _recalculateResetAvailability(): void {
        const hasOnlyOneEmptyIncludeRule = this._includeRules.length === 1 && !this._includeRules[0].hasValue;
        const hasOnlyOneEmptyExcludeRule = this._excludeRules.length === 1 && !this._excludeRules[0].hasValue;
        this._isResetAvailableSubject$.next(!hasOnlyOneEmptyIncludeRule || !hasOnlyOneEmptyExcludeRule);
    }

    /** @hidden */
    _onRuleStateChange(): void {
        this._calculateValidRulesCount();
    }

    /** @hidden */
    private _initiateRules(initialRules?: CollectionFilter[]): void {
        this._includeRules = this._createRules(initialRules?.filter(({ exclude }) => !exclude));
        this._excludeRules = this._createRules(initialRules?.filter(({ exclude }) => exclude));

        [this._includeRules, this._excludeRules].forEach((rules) => {
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
                field: columnKey!,
                value,
                value2,
                strategy: strategy!,
            })
        );
    }

    /** @hidden */
    private _getCollectionFiltersFromIncludeRules(): CollectionFilter[] {
        return this._getCollectionFiltersFromRules(this._includeRules).map(
            (collectionFilter): CollectionFilter => ({
                ...collectionFilter,
                exclude: false
            })
        );
    }

    /** @hidden */
    private _getCollectionFiltersFromExcludeRules(): CollectionFilter[] {
        return this._getCollectionFiltersFromRules(this._excludeRules).map(
            (collectionFilter): CollectionFilter => ({
                ...collectionFilter,
                exclude: true
            })
        );
    }

    /** @hidden */
    private _calculateValidRulesCount = (): void => {
        this._validIncludeRulesCount = this._includeRules.filter(this._isRuleValid).length;
        this._validExcludeRulesCount = this._excludeRules.filter(this._isRuleValid).length;
    };

    /** @hidden */
    private _isRuleValid = (rule: FilterRule): boolean => rule?.isValid;
}

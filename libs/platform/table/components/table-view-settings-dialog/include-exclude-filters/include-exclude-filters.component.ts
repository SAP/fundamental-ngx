import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    output,
    signal,
    untracked,
    ViewEncapsulation
} from '@angular/core';
import { CollectionFilter } from '@fundamental-ngx/platform/table-helpers';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { LayoutGridColDirective, LayoutGridComponent, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';
import { PanelComponent, PanelContentDirective, PanelTitleDirective } from '@fundamental-ngx/core/panel';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { FilterRuleComponent } from '../../table-p13-dialog/filtering/filter-rule.component';
import { FilterableColumn, FilterRule } from '../../table-p13-dialog/filtering/filtering.model';

export interface IncludeExcludeFiltersData {
    columns: FilterableColumn[];
    collectionFilter: CollectionFilter[];
    validator?: (rules: CollectionFilter[]) => boolean;
}

export interface IncludeExcludeFiltersResultData {
    filterBy: CollectionFilter[];
}

/**
 * Include/Exclude Filters Component
 *
 * Provides filtering UI with include and exclude rules panels,
 * designed to be used within the table view settings dialog.
 */
@Component({
    selector: 'fdp-table-include-exclude-filters',
    templateUrl: './include-exclude-filters.component.html',
    styleUrl: './include-exclude-filters.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TemplateDirective,
        PanelComponent,
        PanelTitleDirective,
        PanelContentDirective,
        LayoutGridComponent,
        LayoutGridRowDirective,
        FilterRuleComponent,
        LayoutGridColDirective,
        ButtonComponent,
        FdTranslatePipe
    ]
})
export class IncludeExcludeFiltersComponent {
    /** Filter data input */
    readonly filterData = input<IncludeExcludeFiltersData>();

    /** Validator function for filter rules */
    readonly validator = input<(rules: CollectionFilter[]) => boolean>();

    /** Emits when filters change */
    readonly filterChange = output<IncludeExcludeFiltersResultData>();

    /** Emits when reset availability changes */
    readonly resetAvailabilityChange = output<boolean>();

    /** Table columns available for filtering */
    columns: FilterableColumn[] = [];

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
    _validIncludeRulesCount = signal(0);

    /**
     * @hidden
     * Count of valid excluded rules
     */
    _validExcludeRulesCount = signal(0);

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

    private initialized = false;

    /** @hidden */
    constructor() {
        // Initialize once when filterData is available
        effect(() => {
            const data = this.filterData();
            if (data && !this.initialized) {
                this.initialized = true;
                // Use untracked to prevent signal reads from triggering the effect again
                untracked(() => {
                    this.columns = data.columns.filter((column) => column.filterable) || [];
                    this.initiateRules(data.collectionFilter);
                    this.calculateValidRulesCount();
                    this._excludePanelExpanded = this._validExcludeRulesCount() > 0;
                    this._recalculateResetAvailability();
                });
            }
        });
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.initiateRules();
        this._validIncludeRulesCount.set(0);
        this._validExcludeRulesCount.set(0);
        this._recalculateResetAvailability();
        this.emitChange();
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
        this.calculateValidRulesCount();
        this.emitChange();
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
        const isResetAvailable = !hasOnlyOneEmptyIncludeRule || !hasOnlyOneEmptyExcludeRule;
        this.resetAvailabilityChange.emit(isResetAvailable);
    }

    /** @hidden */
    _onRuleStateChange(): void {
        this.calculateValidRulesCount();
        this.emitChange();
    }

    /** @hidden */
    _onRuleChange(): void {
        this._recalculateResetAvailability();
        this.emitChange();
    }

    /** @hidden */
    private initiateRules(initialRules?: CollectionFilter[]): void {
        this._includeRules = this.createRules(initialRules?.filter(({ exclude }) => !exclude));
        this._excludeRules = this.createRules(initialRules?.filter(({ exclude }) => exclude));

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
    private createRules(collectionFilter: CollectionFilter[] = []): FilterRule[] {
        return collectionFilter.map(
            ({ field, value, value2, strategy }): FilterRule =>
                new FilterRule(this.columns, field, strategy, value, value2)
        );
    }

    /** @hidden */
    private getCollectionFiltersFromRules(rules: FilterRule[]): CollectionFilter[] {
        return rules.filter(this.isRuleValid).map(
            ({ columnKey, strategy, value, value2 }): CollectionFilter => ({
                field: columnKey!,
                value,
                value2,
                strategy: strategy!
            })
        );
    }

    /** @hidden */
    private getCollectionFiltersWithExcludeFlag(rules: FilterRule[], exclude: boolean): CollectionFilter[] {
        return this.getCollectionFiltersFromRules(rules).map((filter): CollectionFilter => ({ ...filter, exclude }));
    }

    /** @hidden */
    private calculateValidRulesCount = (): void => {
        this._validIncludeRulesCount.set(this._includeRules.filter(this.isRuleValid).length);
        this._validExcludeRulesCount.set(this._excludeRules.filter(this.isRuleValid).length);
    };

    /** @hidden */
    private isRuleValid = (rule: FilterRule): boolean => rule?.isValid;

    /** @hidden */
    private emitChange(): void {
        const includeFilters = this.getCollectionFiltersWithExcludeFlag(this._includeRules, false);
        const excludeFilters = this.getCollectionFiltersWithExcludeFlag(this._excludeRules, true);
        const combinedFilters = [...includeFilters, ...excludeFilters];

        this.filterChange.emit({ filterBy: combinedFilters });
    }
}

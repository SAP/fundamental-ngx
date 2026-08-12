import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
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
export class IncludeExcludeFiltersComponent implements OnInit {
    /** Filter data input */
    @Input()
    filterData: IncludeExcludeFiltersData | undefined;

    /** Validator function for filter rules */
    @Input()
    validator?: (rules: CollectionFilter[]) => boolean;

    /** Emits when filters change */
    @Output()
    filterChange = new EventEmitter<IncludeExcludeFiltersResultData>();

    /** Emits when reset availability changes */
    @Output()
    resetAvailabilityChange = new EventEmitter<boolean>();

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

    /** @hidden */
    ngOnInit(): void {
        if (this.filterData) {
            this.columns = this.filterData.columns.filter((column) => column.filterable) || [];
            this._initiateRules(this.filterData.collectionFilter);
            this._calculateValidRulesCount();
            this._excludePanelExpanded = this._validExcludeRulesCount() > 0;
            this._recalculateResetAvailability();
        }
    }

    /** Reset changes to the initial state */
    reset(): void {
        this._initiateRules();
        this._validIncludeRulesCount.set(0);
        this._validExcludeRulesCount.set(0);
        this._recalculateResetAvailability();
        this._emitChange();
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
        this._emitChange();
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
        this._calculateValidRulesCount();
        this._emitChange();
    }

    /** @hidden */
    _onRuleChange(): void {
        this._recalculateResetAvailability();
        this._emitChange();
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
                strategy: strategy!
            })
        );
    }

    /** @hidden */
    private _getCollectionFiltersWithExcludeFlag(rules: FilterRule[], exclude: boolean): CollectionFilter[] {
        return this._getCollectionFiltersFromRules(rules).map((filter): CollectionFilter => ({ ...filter, exclude }));
    }

    /** @hidden */
    private _calculateValidRulesCount = (): void => {
        this._validIncludeRulesCount.set(this._includeRules.filter(this._isRuleValid).length);
        this._validExcludeRulesCount.set(this._excludeRules.filter(this._isRuleValid).length);
    };

    /** @hidden */
    private _isRuleValid = (rule: FilterRule): boolean => rule?.isValid;

    /** @hidden */
    private _emitChange(): void {
        const includeFilters = this._getCollectionFiltersWithExcludeFlag(this._includeRules, false);
        const excludeFilters = this._getCollectionFiltersWithExcludeFlag(this._excludeRules, true);
        const combinedFilters = [...includeFilters, ...excludeFilters];

        this.filterChange.emit({ filterBy: combinedFilters });
    }
}

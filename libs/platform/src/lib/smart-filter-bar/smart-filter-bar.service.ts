import { Injectable, Type } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';
import {
    BaseDynamicFormGeneratorControl,
    FormGeneratorService,
    PreparedDynamicFormFieldItem
} from '@fundamental-ngx/platform/form';
import {
    CollectionFilterGroup,
    FilterableColumnDataType,
    FilterAllStrategy,
    getFilterStrategiesBasedOnDataType
} from '@fundamental-ngx/platform/table';
import { isSelectItem, SelectItem } from '@fundamental-ngx/platform/shared';

import { SmartFilterBarCustomFilterConfig } from './interfaces/smart-filter-bar-custom-filter-config';
import { SmartFilterBarCondition } from './interfaces/smart-filter-bar-condition';
import { selectStrategy } from '@fundamental-ngx/cdk/utils';

@Injectable()
export class SmartFilterBarService {
    /** @hidden */
    private _customFilterConditions: Map<Type<BaseDynamicFormGeneratorControl>, SmartFilterBarCustomFilterConfig> =
        new Map<Type<BaseDynamicFormGeneratorControl>, SmartFilterBarCustomFilterConfig>();

    /** @hidden */
    constructor(private _fgService: FormGeneratorService) {}

    /**
     * Adds custom filter type to the smart filter bar.
     * @param options Configuration options.
     * @returns true if component was added successfully.
     */
    addCustomFilter(options: SmartFilterBarCustomFilterConfig): boolean {
        if (!options.conditionComponent && options.rendererComponent) {
            options.conditionComponent = options.rendererComponent;
        }

        if (!options.conditionComponent) {
            return false;
        }

        const result = this._fgService.addComponent(options.conditionComponent, options.types);

        if (result) {
            this._customFilterConditions.set(options.conditionComponent, options);
        }

        if (result && options.rendererComponent) {
            this._fgService.addComponent(
                options.rendererComponent,
                options.types.map((t) => `${t}-renderer`)
            );
        }

        return result;
    }

    /**
     * Returns provided configuration object of the custom filter.
     * @param type Filter type.
     * @returns Configuration object.
     */
    getCustomFilterConfiguration(type: string): SmartFilterBarCustomFilterConfig | undefined {
        const componentDefinition = this._fgService.getComponentDefinitionByType(type);

        if (!componentDefinition) {
            return undefined;
        }

        return this._customFilterConditions.get(componentDefinition.component);
    }

    /**
     * Returns applicable condition options of the filter.
     * @param type Filter type.
     * @param dataType Filter data type.
     * @returns Array of applicable condition options.
     */
    getApplicableFilterConditions(
        type: string,
        dataType: FilterableColumnDataType = FilterableColumnDataType.STRING
    ): FilterAllStrategy[] {
        const componentDefinition = this._fgService.getComponentDefinitionByType(type);

        const defaultConditions: FilterAllStrategy[] = getFilterStrategiesBasedOnDataType(
            dataType
        ) as FilterAllStrategy[];

        if (!componentDefinition) {
            return defaultConditions;
        }

        const filterDefinition = this._customFilterConditions.get(componentDefinition.component);

        return filterDefinition?.filterStrategies || defaultConditions;
    }

    /** @hidden */
    async getDisplayValue(condition: SmartFilterBarCondition, filterType: string): Promise<string> {
        const configuration = this.getCustomFilterConfiguration(filterType);

        if (configuration?.valueRenderer) {
            const obj = configuration?.valueRenderer(condition);
            const strategy = selectStrategy(obj);

            let returnValue!: string;

            await strategy.createSubscription(obj, (value) => {
                returnValue = value;
            });

            return returnValue;
        }

        const value1 = this._normalizeValue(condition.value);
        const value2 = this._normalizeValue(condition.value2);

        switch (condition.operator) {
            case 'equalTo':
                return `=${value1}`;
            case 'contains':
                return `*${value1}*`;
            case 'between':
                return `${value1}...${value2}`;
            case 'beginsWith':
                return `${value1}*`;
            case 'endsWith':
                return `*${value1}`;
            case 'greaterThan':
                return `>${value1}`;
            case 'greaterThanOrEqualTo':
                return `>=${value1}`;
            case 'lessThan':
                return `<${value1}`;
            case 'lessThanOrEqualTo':
                return `<=${value1}`;
            case 'after':
                return `>${value1}`;
            case 'onOrAfter':
                return `>=${value1}`;
            case 'before':
                return `<${value1}`;
            case 'beforeOrOn':
                return `<=${value1}`;
            default:
                return `${value1}`;
        }
    }

    /**
     * Method for normalizing generated conditions to display in human-readable format.
     * @returns Formatted array of conditions.
     * @param formItem
     * @param conditions
     */
    async normalizeConditions(
        formItem: PreparedDynamicFormFieldItem,
        conditions: SmartFilterBarCondition[]
    ): Promise<SmartFilterBarCondition[]> {
        const normalizedConditions: SmartFilterBarCondition[] = [];

        for (const condition of conditions) {
            const newCondition = Object.assign({}, condition);

            newCondition.displayValue = await this.getDisplayValue(
                newCondition,
                formItem.guiOptions?.additionalData.type
            );

            normalizedConditions.push(newCondition);
        }

        return normalizedConditions;
    }

    /**
     * Returns formatted condition variants.
     */
    async getConditionFieldSelectedVariants(
        formItem: PreparedDynamicFormFieldItem,
        conditions: SmartFilterBarCondition[]
    ): Promise<SelectItem[]> {
        return (await this.normalizeConditions(formItem, conditions)).map((c: any) => {
            if (isSelectItem(c)) {
                return c;
            }

            const condition: SelectItem = {
                label: c.displayValue,
                value: c
            };

            return condition;
        });
    }

    /**
     * Transforms collection filter into smart filter bar condition.
     */
    transformCollectionFilter(filterGroup: CollectionFilterGroup): SmartFilterBarCondition[] {
        return filterGroup.filters.map((filter) => {
            const condition: SmartFilterBarCondition = {
                operator: filter.strategy,
                value: filter.value,
                value2: filter.value2
            };

            return condition;
        });
    }

    /**
     * @hidden
     * Normalizes condition value.
     * @param value
     * @returns
     */
    private _normalizeValue(value: any): any {
        if (Array.isArray(value)) {
            return value.map((v) => this._normalizeValue(v)).join(', ');
        }

        if (isSelectItem(value)) {
            return value.label;
        }

        if (value instanceof FdDate) {
            return value.toDateString();
        }

        return value;
    }
}

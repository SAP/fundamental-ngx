import { FilterableColumnDataType, FilterStrategy } from '@fundamental-ngx/platform/table';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { InputType } from '@fundamental-ngx/platform/form';
import { SmartFilterBarStrategyLabels } from './strategy-labels.type';

export interface SmartFilterBarConditionBuilder {
    /**
     * Header of the dialog window.
     */
    header: string;
    /**
     * Filter data type.
     */
    dataType: FilterableColumnDataType;
    /**
     * Applied conditions for the filter.
     */
    conditions: SmartFilterBarCondition[];
    /**
     * Filter type.
     */
    filterType: string;
    /**
     * Available options for filtering.
     */
    choices: SelectItem[];
    /**
     * Input type.
     */
    controlType: InputType;

    /**
     * @deprecated use i18n capabilities instead
     * Condition strategy labels.
     */
    defineStrategyLabels?: SmartFilterBarStrategyLabels;
}

export interface SmartFilterBarCondition<T = any> {
    /**
     * Filter value.
     */
    value: T;
    /**
     * Range filter value.
     */
    value2?: T;
    /**
     * Condition type.
     */
    operator: FilterStrategy;
    /**
     * Human-readable value to be displayed in smart filter bar.
     */
    displayValue?: string;
}

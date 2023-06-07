import { FilterableColumnDataType } from './filter-type.enum';

/** All possible strategies */
export const FILTER_STRATEGY = {
    EQ: 'equalTo',
    CONTAINS: 'contains',
    BETWEEN: 'between',
    BEGINS_WITH: 'beginsWith',
    ENDS_WITH: 'endsWith',
    GT: 'greaterThan',
    GTE: 'greaterThanOrEqualTo',
    LT: 'lessThan',
    LTE: 'lessThanOrEqualTo',
    AFTER: 'after',
    ON_OR_AFTER: 'onOrAfter',
    BEFORE: 'before',
    BEFORE_OR_ON: 'beforeOrOn'
} as const;

type FilterStrategyType = typeof FILTER_STRATEGY;

export type FilterStrategy = FilterStrategyType[keyof FilterStrategyType];

/** Date Filter Strategies */
export const FILTER_DATE_STRATEGY: Pick<
    FilterStrategyType,
    'BETWEEN' | 'EQ' | 'AFTER' | 'ON_OR_AFTER' | 'BEFORE' | 'BEFORE_OR_ON'
> = {
    EQ: 'equalTo',
    BETWEEN: 'between',
    AFTER: 'after',
    ON_OR_AFTER: 'onOrAfter',
    BEFORE: 'before',
    BEFORE_OR_ON: 'beforeOrOn'
};

export type FilterDateStrategy = (typeof FILTER_DATE_STRATEGY)[keyof typeof FILTER_DATE_STRATEGY];

export const FILTER_DATE_STRATEGIES: ReadonlyArray<FilterDateStrategy> = Object.values(FILTER_DATE_STRATEGY);

/** Number Filter Strategies */
export const FILTER_NUMBER_STRATEGY: Pick<FilterStrategyType, 'BETWEEN' | 'EQ' | 'GT' | 'GTE' | 'LT' | 'LTE'> = {
    EQ: 'equalTo',
    BETWEEN: 'between',
    GT: 'greaterThan',
    GTE: 'greaterThanOrEqualTo',
    LT: 'lessThan',
    LTE: 'lessThanOrEqualTo'
};

export type FilterNumberStrategy = (typeof FILTER_NUMBER_STRATEGY)[keyof typeof FILTER_NUMBER_STRATEGY];

export const FILTER_NUMBER_STRATEGIES: ReadonlyArray<FilterNumberStrategy> = Object.values(FILTER_NUMBER_STRATEGY);

/** String Filter Strategies */
export const FILTER_STRING_STRATEGY: Pick<
    FilterStrategyType,
    'BETWEEN' | 'CONTAINS' | 'EQ' | 'BEGINS_WITH' | 'ENDS_WITH' | 'GT' | 'GTE' | 'LT' | 'LTE'
> = {
    CONTAINS: 'contains',
    EQ: 'equalTo',
    BEGINS_WITH: 'beginsWith',
    BETWEEN: 'between',
    ENDS_WITH: 'endsWith',
    GT: 'greaterThan',
    GTE: 'greaterThanOrEqualTo',
    LT: 'lessThan',
    LTE: 'lessThanOrEqualTo'
};

export type FilterAllStrategy = (typeof FILTER_STRATEGY)[keyof typeof FILTER_STRATEGY];

export type FilterStringStrategy = (typeof FILTER_STRING_STRATEGY)[keyof typeof FILTER_STRING_STRATEGY];

export const FILTER_STRING_STRATEGIES: ReadonlyArray<FilterStringStrategy> = Object.values(FILTER_STRING_STRATEGY);

/** Boolean Filter Strategies */
export const FILTER_BOOLEAN_STRATEGY: Pick<FilterStrategyType, 'EQ'> = {
    EQ: 'equalTo'
};

export type FilterBooleanStrategy = (typeof FILTER_BOOLEAN_STRATEGY)[keyof typeof FILTER_BOOLEAN_STRATEGY];

export const FILTER_BOOLEAN_STRATEGIES: ReadonlyArray<FilterStringStrategy> = Object.values(FILTER_BOOLEAN_STRATEGY);

/** Default Filter Strategies for undefined data type */
export const FILTER_DEFAULT_STRATEGY: Pick<FilterStrategyType, 'EQ'> = {
    EQ: 'equalTo'
};

export type FilterDefaultStrategy = (typeof FILTER_DEFAULT_STRATEGY)[keyof typeof FILTER_DEFAULT_STRATEGY];

export const FILTER_DEFAULT_STRATEGIES: ReadonlyArray<FilterStringStrategy> = Object.values(FILTER_DEFAULT_STRATEGY);

// Get Possible strategies based on data type
export const getFilterStrategiesBasedOnDataType = (
    dataType: FilterableColumnDataType
): readonly FilterStringStrategy[] | readonly FilterDateStrategy[] => {
    switch (dataType) {
        case FilterableColumnDataType.STRING:
            return FILTER_STRING_STRATEGIES;
        case FilterableColumnDataType.NUMBER:
            return FILTER_NUMBER_STRATEGIES;
        case FilterableColumnDataType.DATE:
            return FILTER_DATE_STRATEGIES;
        case FilterableColumnDataType.BOOLEAN:
            return FILTER_BOOLEAN_STRATEGIES;

        default:
            return FILTER_DEFAULT_STRATEGIES;
    }
};

export enum VhdDefineIncludeStrategy {
    contains = 'contains',
    equalTo = 'equalTo',
    between = 'between',
    startsWith = 'startsWith',
    endsWith = 'endsWith',
    lessThan = 'lessThan',
    lessThanEqual = 'lessThanEqual',
    greaterThan = 'greaterThan',
    greaterThanEqual = 'greaterThanEqual',
    empty = 'empty'
}

export enum VhdDefineExcludeStrategy {
    not_equalTo = 'not_equalTo',
    not_empty = 'not_empty'
}

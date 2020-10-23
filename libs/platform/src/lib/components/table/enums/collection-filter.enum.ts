enum BaseCollectionFilterStrategy {
    BETWEEN = 'between',
    EQ = 'equal to',
    GT = 'greater than',
    GTE = 'greater than or equal to',
    LT = 'less than',
    LTE = 'less than or equal to'
}

/** String filter */
enum SpecificCollectionStringFilterStrategy {
    CONTAINS = 'contains',
    BEGINS_WITH = 'begins with',
    ENDS_WITH = 'ends with'
}

export type CollectionStringFilterStrategy = BaseCollectionFilterStrategy | SpecificCollectionStringFilterStrategy;
export const CollectionStringFilterStrategy = { ...BaseCollectionFilterStrategy, ...SpecificCollectionStringFilterStrategy };

/** Number filter */
export type CollectionNumberFilterStrategy = BaseCollectionFilterStrategy;
export const CollectionNumberFilterStrategy = BaseCollectionFilterStrategy;

/** Date filter */
enum SpecificCollectionDateFilterStrategy {
    BETWEEN = 'between',
    EQ = 'equal to',
    AFTER = 'after',
    ON_OR_AFTER = 'on or after',
    BEFORE = 'before',
    BEFORE_OR_ON = 'before or on'
}

export type CollectionDateFilterStrategy = SpecificCollectionDateFilterStrategy;
export const CollectionDateFilterStrategy = SpecificCollectionDateFilterStrategy;

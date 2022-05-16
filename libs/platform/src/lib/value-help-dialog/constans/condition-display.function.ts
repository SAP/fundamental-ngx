import {
    VhdIncludedEntity,
    VhdExcludedEntity,
    VhdFilter,
    VhdDefineIncludeStrategy,
    VhdDefineExcludeStrategy
} from '../models';

export const defaultConditionDisplayFn = (
    item: VhdIncludedEntity | VhdExcludedEntity,
    filters?: VhdFilter[]
): string | null => {
    const filter = (filters || []).find((f) => f.key === item.key);
    let value = (() => {
        switch (item.strategy) {
            case VhdDefineIncludeStrategy.empty:
            case VhdDefineExcludeStrategy.not_empty:
                return null;
            case VhdDefineIncludeStrategy.between:
                return `${item.value}...${item.valueTo}`;
            case VhdDefineIncludeStrategy.contains:
                return `*${item.value}*`;
            case VhdDefineIncludeStrategy.equalTo:
                return `=${item.value}`;
            case VhdDefineIncludeStrategy.startsWith:
                return `${item.value}*`;
            case VhdDefineIncludeStrategy.endsWith:
                return `*${item.value}`;
            case VhdDefineIncludeStrategy.greaterThan:
                return `>${item.value}`;
            case VhdDefineIncludeStrategy.greaterThanEqual:
                return `>=${item.value}`;
            case VhdDefineIncludeStrategy.lessThan:
                return `<${item.value}`;
            case VhdDefineIncludeStrategy.lessThanEqual:
                return `<=${item.value}`;
            case VhdDefineExcludeStrategy.not_equalTo:
                return `!(=${item.value})`;
        }
    })();
    if (value && item.type === 'exclude') {
        value = `!(${value})`;
    }
    if (filter) {
        return `${filter.label}: ${value}`;
    }

    return value;
};

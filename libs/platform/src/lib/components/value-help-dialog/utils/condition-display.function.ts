
import { VhdIncludedEntity, VhdExcludedEntity, VhdFilter, VhdDefineStrategy } from '../models';

export const defaultConditionDisplayFn = (item: VhdIncludedEntity | VhdExcludedEntity, filters?: VhdFilter[]) => {
    const filter = (filters || []).find(f => f.key === item.key);
    let value = (() => {
        switch (item.strategy) {
        case VhdDefineStrategy.empty:
            return null;
        case VhdDefineStrategy.between:
            return `${item.value}...${item.valueTo}`;
        case VhdDefineStrategy.contains:
            return `*${item.value}*`;
        case VhdDefineStrategy.equalTo:
            return `=${item.value}`;
        case VhdDefineStrategy.startsWith:
            return `${item.value}*`;
        case VhdDefineStrategy.endsWith:
            return `*${item.value}`;
        case VhdDefineStrategy.greaterThan:
            return `>${item.value}`;
        case VhdDefineStrategy.greaterThanEqual:
            return `>=${item.value}`;
        case VhdDefineStrategy.lessThan:
            return `<${item.value}`;
        case VhdDefineStrategy.lessThanEqual:
            return `<=${item.value}`;
        }
    })();
    if (value && item.type === 'exclude') {
        value = `!(${value})`;
    }
    if (filter) {
        return `${filter.label}: ${value}`;
    }

    return value;
}

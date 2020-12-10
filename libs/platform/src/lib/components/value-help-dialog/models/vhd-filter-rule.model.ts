export type VhdDefineType = 'include' | 'exclude';

export enum VhdDefineStrategy {
    contains = 'contains',
    equalTo = 'equal to',
    between = 'between',
    startsWith = 'starts with',
    endsWith = 'ends with',
    lessThan = 'less than',
    lessThanEqual = 'less than or equal to',
    greaterThan = 'greater than',
    greaterThanEqual = 'greater than or equal to',
    empty = 'empty'
}

class BetweenRule {
    from: string;
    to: string;
}
export interface VhdDefineEntityRule<T = string | BetweenRule> {
    type: VhdDefineType;
    value: T;
    key: string;
    strategy: VhdDefineStrategy;
}

class BaseEntity implements VhdDefineEntityRule {
    type: VhdDefineType;
    key = '*';
    label?: string;
    strategy: VhdDefineStrategy;
    value = '';
    valueTo = '';

    constructor(strategy?: VhdDefineStrategy, key?: string) {
        if (key) {
            this.key = key;
        }
        this.strategy = strategy || VhdDefineStrategy.equalTo;
    }
}
export class IncludedEntity extends BaseEntity {
    type: VhdDefineType = 'include';
}
export class ExcludedEntity extends BaseEntity {
    type: VhdDefineType = 'exclude';
}

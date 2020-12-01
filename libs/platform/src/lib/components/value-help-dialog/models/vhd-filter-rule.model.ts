export type VhdDefineType = 'include' | 'exclude';

export type VhdDefineStrategy = 'between' |
    'contains' |
    'equal to' |
    'begins with' |
    'ends with' |
    'greater than' |
    'greater than or equal to' |
    'less than' |
    'less than or equal to';

export interface VhdDefineEntityRule<T = string> {
    type: VhdDefineType;
    value: T;
    key: string;
    strategy: VhdDefineStrategy;
}

export interface VhdDefineIncludeEntityRule extends VhdDefineEntityRule {
    type: 'include';
}

export interface VhdDefineExcludeEntityRule extends VhdDefineEntityRule {
    type: 'include';
}

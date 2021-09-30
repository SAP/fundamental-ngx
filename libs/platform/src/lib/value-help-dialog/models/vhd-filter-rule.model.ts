import { VhdDefineExcludeStrategy, VhdDefineIncludeStrategy } from './vhd-strategy.enum';
import { VhdDefineType } from './vhd-type-condition.enum';

export interface VhdDefineEntityRule {
    type: VhdDefineType;
    key: string;
    strategy: VhdDefineIncludeStrategy | VhdDefineExcludeStrategy;
    value: string;
    valueTo: string;
}

export class BaseEntity implements VhdDefineEntityRule {
    type: VhdDefineType;
    key = '*';
    label?: string;
    strategy: (VhdDefineIncludeStrategy | VhdDefineExcludeStrategy);
    value = '';
    valueTo = '';
    valid: boolean;

    constructor(strategy?: VhdDefineIncludeStrategy | VhdDefineExcludeStrategy, key?: string) {
        if (key) {
            this.key = key;
        }
        this.strategy = strategy || VhdDefineIncludeStrategy.equalTo;
    }
}
export class VhdIncludedEntity extends BaseEntity {
    type: VhdDefineType = VhdDefineType.include;
}
export class VhdExcludedEntity extends BaseEntity {
    type: VhdDefineType = VhdDefineType.exclude;
}

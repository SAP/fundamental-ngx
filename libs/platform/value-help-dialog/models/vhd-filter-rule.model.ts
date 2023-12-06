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
    /** @hidden */
    type: VhdDefineType;
    /** @hidden */
    key = '*';
    /** @hidden */
    label?: string;
    /** @hidden */
    strategy: VhdDefineIncludeStrategy | VhdDefineExcludeStrategy;
    /** @hidden */
    value = '';
    /** @hidden */
    valueTo = '';
    /** @hidden */
    valid: boolean;

    /** @hidden */
    constructor(strategy?: VhdDefineIncludeStrategy | VhdDefineExcludeStrategy, key?: string) {
        if (key) {
            this.key = key;
        }
        this.strategy = strategy || VhdDefineIncludeStrategy.equalTo;
    }
}
export class VhdIncludedEntity extends BaseEntity {
    /** @hidden */
    type: VhdDefineType = VhdDefineType.include;
}
export class VhdExcludedEntity extends BaseEntity {
    /** @hidden */
    type: VhdDefineType = VhdDefineType.exclude;
}

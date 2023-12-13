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
    /** @ignore */
    type: VhdDefineType;
    /** @ignore */
    key = '*';
    /** @ignore */
    label?: string;
    /** @ignore */
    strategy: VhdDefineIncludeStrategy | VhdDefineExcludeStrategy;
    /** @ignore */
    value = '';
    /** @ignore */
    valueTo = '';
    /** @ignore */
    valid: boolean;

    /** @ignore */
    constructor(strategy?: VhdDefineIncludeStrategy | VhdDefineExcludeStrategy, key?: string) {
        if (key) {
            this.key = key;
        }
        this.strategy = strategy || VhdDefineIncludeStrategy.equalTo;
    }
}
export class VhdIncludedEntity extends BaseEntity {
    /** @ignore */
    type: VhdDefineType = VhdDefineType.include;
}
export class VhdExcludedEntity extends BaseEntity {
    /** @ignore */
    type: VhdDefineType = VhdDefineType.exclude;
}

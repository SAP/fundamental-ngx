import { VhdDefineStrategy } from './vhd-strategy.enum';
import { VhdDefineType } from './vhd-type-condition.enum';

export interface VhdDefineEntityRule {
    type: VhdDefineType;
    key: string;
    strategy: VhdDefineStrategy;
    value: string;
    valueTo: string;
}

class BaseEntity implements VhdDefineEntityRule {
    type: VhdDefineType;
    key = '*';
    label?: string;
    strategy: VhdDefineStrategy;
    value = '';
    valueTo = '';
    valid: boolean;

    constructor(strategy?: VhdDefineStrategy, key?: string) {
        if (key) {
            this.key = key;
        }
        this.strategy = strategy || VhdDefineStrategy.equalTo;
    }
}
export class VhdIncludedEntity extends BaseEntity {
    type: VhdDefineType = VhdDefineType.include;
}
export class VhdExcludedEntity extends BaseEntity {
    type: VhdDefineType = VhdDefineType.exclude;
}

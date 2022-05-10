import { BaseEntity } from './vhd-filter-rule.model';

export interface VhdValue<S = any> {
    selected?: S[];
    conditions?: BaseEntity[];
}

export interface VhdValueChangeEvent<S = any> {
    selected: S[];
    conditions: BaseEntity[];
}

import { BaseEntity } from './vhd-filter-rule.model';

export interface VhdValue<S = unknown> {
    selected?: S;
    conditions?: BaseEntity[];
}

export interface VhdValueChangeEvent<S = unknown> {
    selected: S;
    conditions: BaseEntity[];
}

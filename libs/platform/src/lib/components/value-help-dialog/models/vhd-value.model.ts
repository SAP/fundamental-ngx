import { VhdIncludedEntity, VhdExcludedEntity } from './vhd-filter-rule.model';

export interface VhdValue<S = unknown> {
  selected?: S;
  included?: VhdIncludedEntity[];
  excluded?: VhdExcludedEntity[];
}

export interface VhdValueChangeEvent<S = unknown> {
  selected: S;
  included: VhdIncludedEntity[];
  excluded: VhdExcludedEntity[];
}

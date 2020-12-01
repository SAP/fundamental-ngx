import { VhdDefineIncludeEntityRule, VhdDefineExcludeEntityRule } from './vhd-filter-rule.model';

export interface VhdValueChangeEvent<S = unknown> {
  selected?: S;
  included?: VhdDefineIncludeEntityRule[];
  excluded?: VhdDefineExcludeEntityRule[];
}

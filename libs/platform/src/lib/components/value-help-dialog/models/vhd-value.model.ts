import { IncludedEntity, ExcludedEntity } from './vhd-filter-rule.model';

export interface VhdValueChangeEvent<S = unknown> {
  selected?: S;
  included?: IncludedEntity[];
  excluded?: ExcludedEntity[];
}

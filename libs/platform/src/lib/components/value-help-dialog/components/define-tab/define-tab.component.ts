import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import {
  VhdIncludedEntity,
  VhdExcludedEntity,
  VhdFilter,
  VhdDefineStrategy,
  VhdDefineType
} from '../../models';
import { MAX_CHARACTER_HINT_COUNT } from '../../constans';
import { VhdBaseTab } from '../base-tab/vhd-base-tab.component';

class ExtendedIncludedEntity extends VhdIncludedEntity {
  id: number;
}
class ExtendedExcludedEntity extends VhdExcludedEntity {
  id: number;
}

@Component({
  selector: 'fdp-define-tab',
  templateUrl: './define-tab.component.html',
  styleUrls: ['./define-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineTabComponent<T> extends VhdBaseTab implements OnInit, OnChanges {
  @Input()
  fullBodyLabel = 'Product';

  @Input()
  included: ExtendedIncludedEntity[] = [];

  @Input()
  excluded: ExtendedExcludedEntity[] = [];

  @Input()
  strategyLabels: {[key in keyof typeof VhdDefineStrategy]?: string} = {};

  @Output()
  includeChange: EventEmitter<ExtendedIncludedEntity[]> = new EventEmitter<ExtendedIncludedEntity[]>();
  @Output()
  excludeChange: EventEmitter<ExtendedExcludedEntity[]> = new EventEmitter<ExtendedExcludedEntity[]>();

  /** @hidden */
  _includeFilters: VhdFilter[] = [];
  /** @hidden */
  _excludeFilters: VhdFilter[] = [];
  /** @hidden */
  _included: ExtendedIncludedEntity[] = [];
  /** @hidden */
  _excluded: ExtendedExcludedEntity[] = [];
  /** @hidden */
  _definePanelState = {
    included: false,
    excluded: false
  }
  /** @hidden */
  _rules = {
    maxCharactersHintCount: MAX_CHARACTER_HINT_COUNT
  }
  /** @hidden */
  _strategyValues = VhdDefineStrategy;
  /** @hidden */
  _defineTypes = VhdDefineType;
  /** @hidden */
  _includeStrategy = [];
  /** @hidden */
  _excludeStrategy = [];

  /** @hidden */
  ngOnInit(): void {
    this._included = this.included as ExtendedIncludedEntity[] || [];
    this._excluded = this.excluded as ExtendedExcludedEntity[] || [];
    this._initializeFilters();
  }

  /** @hidden */
  ngOnChanges(changes: SimpleChanges): void {
    if ('filters' in changes) {
      this._initializeFilters();
    }
    if ('included' in changes) {
      this._included = this.included as ExtendedIncludedEntity[] || [];
    }
    if ('excluded' in changes) {
      this._excluded = this.excluded as ExtendedExcludedEntity[] || [];
    }
    if ('strategyLabels' in changes) {
      this._refreshStrategies();
    }
  }

  /** @hidden Track function for main data */
  _trackByKeyAndType(_index: number, item: ExtendedIncludedEntity | ExtendedExcludedEntity): number | string | undefined {
    if (item) {
      return item.id + item.key + item.type;
    }

    return undefined;
  }

  /** @hidden */
  _filterChanged(): void {
    this.includeChange.emit(this._included);
    this.excludeChange.emit(this._excluded);
    this._changeDetectorRef.markForCheck();
  }

  /** @hidden */
  addEmptyCondition(type: VhdDefineType): void {
    if (type === VhdDefineType.include) {
      this._addEmptyIncluded();
    }
    if (type === VhdDefineType.exclude) {
      this._addEmptyExcluded();
    }
    this._filterChanged();
  }

  /** @hidden */
  removeCondition(items: ExtendedIncludedEntity[] | ExtendedExcludedEntity[], index: number): void {
    items.splice(index, 1);
    this._filterChanged();
    this._changeDetectorRef.markForCheck();
  }

  /** @hidden */
  _checkConditionValue(item: ExtendedIncludedEntity | ExtendedExcludedEntity, valid: boolean | boolean[]): void {
    item.valid = Array.isArray(valid) ? valid.every(Boolean) : valid;
    if (item.valid) {
      this._filterChanged();
    }
  }

  /** @hidden */
  private _refreshStrategies(): void {
    this._includeStrategy = this._allStrategies();
    this._excludeStrategy = this._includeStrategy
      .filter(({label}) => {
        switch (label) {
          case VhdDefineStrategy.equalTo:
          case VhdDefineStrategy.empty:
            return true;
        };
        return false;
      });
  }

  /** @hidden */
  private _addEmptyIncluded(): void {
    if (this._includeFilters.length) {
      const key = this._included.length ? this._included[this._included.length - 1].key : this._includeFilters[0].key;
      const strategy = this._included.length ? this._included[this._included.length - 1].strategy : null;
      const item = new ExtendedIncludedEntity(strategy, key);
      item.id = Date.now() + this._included.length;
      this._included.push(item);
      this._definePanelState.included = true;
    }
  }

  /** @hidden */
  private _addEmptyExcluded(): void {
    if (this._excludeFilters.length) {
      const key = this._excluded.length ? this._excluded[this._excluded.length - 1].key : this._excludeFilters[0].key;
      const strategy = this._excluded.length ? this._excluded[this._excluded.length - 1].strategy : null;
      const item = new ExtendedExcludedEntity(strategy, key);
      item.id = Date.now() + this._excluded.length;
      this._excluded.push(item);
      this._definePanelState.excluded = true;
    }
  }

  /** @hidden */
  private _initializeFilters(): void {
    this._includeFilters = this.filters.filter(f => f.include);
    this._excludeFilters = this.filters.filter(f => f.exclude);

    this._definePanelState.included = !!this._included.length;
    this._definePanelState.excluded = !!this._excluded.length;
  }

  /** @hidden */
  private _allStrategies(): { label: VhdDefineStrategy; key: string; }[] {
    return Object.entries(VhdDefineStrategy).map(([key, label]) => ({
      key: key,
      label: label
    }));
  };
}

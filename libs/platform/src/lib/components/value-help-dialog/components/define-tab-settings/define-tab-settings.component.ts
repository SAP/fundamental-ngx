import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ValueHelDialogBaseTab,
  IncludedEntity,
  ExcludedEntity,
  ValueHelpDialogTabs,
  VhdDefineEntityRule,
  VhdFilter,
  VhdDefineStrategy
} from '../../models';

enum DefineType {
  include = 'include',
  exclude = 'exclude'
}
class ExtendedIncludedEntity extends IncludedEntity {
  id: number;
} class ExtendedExcludedEntity extends ExcludedEntity {
  id: number;
}

@Component({
  selector: 'fdp-define-tab-settings',
  templateUrl: './define-tab-settings.component.html',
  styleUrls: ['./define-tab-settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineTabSettingsComponent<T> extends ValueHelDialogBaseTab {
  @Input()
  fullBodyLabel = 'Product'
  /** @hidden */
  _includeFilters: VhdFilter[] = [];
  /** @hidden */
  _excludeFilters: VhdFilter[] = [];
  /** @hidden */
  _included: IncludedEntity[] = [];
  /** @hidden */
  _excluded: ExcludedEntity[] = [];
  /** @hidden */
  _definePanelState = {
    included: true,
    excluded: true
  }
  /** @hidden */
  _strategyValues = VhdDefineStrategy;
  /** @hidden */
  _defineTypes = DefineType;
  /** @hidden */
  _includeStrategy = this._allStrategies();
  /** @hidden */
  _excludeStrategy = this._includeStrategy
    .filter(s => {
      return s.key === VhdDefineStrategy.equalTo || s.key === VhdDefineStrategy.empty;
    });

  get type(): ValueHelpDialogTabs {
    return ValueHelpDialogTabs.defineConditions
  }

  /** Manually reset state */
  resetState(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  listenEvents(): void {
    this._subscriptions = new Subscription();
    this._subscriptions.add(this._stateService.displayedFilters$.asObservable().subscribe((filters: VhdFilter[]) => {
      this._initializeFilters(filters);
      this.addNewIncluded();
      this._changeDetectorRef.markForCheck();
    }));
  }

  addNewIncluded(): void {
    if (this._includeFilters.length) {
      const key = this._included.length ? this._included[this._included.length - 1].key : this._includeFilters[0].key;
      const strategy = this._included.length ? this._included[this._included.length - 1].strategy : null;
      const item = new ExtendedIncludedEntity(strategy, key);
      item.id = Date.now() + this._included.length;
      this._included.push(item);
      this._filterChanged();
    }
  }
  addNewExcluded(): void {
    if (this._excludeFilters.length) {
      const key = this._excluded.length ? this._excluded[this._excluded.length - 1].key : this._excludeFilters[0].key;
      const strategy = this._included.length ? this._included[this._included.length - 1].strategy : null;
      const item = new ExtendedExcludedEntity(strategy, key);
      item.id = Date.now() + this._excluded.length;
      this._excluded.push(item);
      this._filterChanged();
    }
  }

  /** @hidden Track function for main data */
  _trackByKeyAndType(_index: number, item: VhdDefineEntityRule & { id: number }): number | string | undefined {
    if (item) {
      return item.key || item.type;
    }

    return undefined;
  }


  _filterChanged(): void {
    this._stateService.includedItems$.next(this.getFilledCondition(this._included));
    this._stateService.excludedItems$.next(this.getFilledCondition(this._excluded));
    this._changeDetectorRef.detectChanges();
  }

  addItem(type: DefineType): void {
    if (type === DefineType.include) {
      this.addNewIncluded();
    }
    if (type === DefineType.exclude) {
      this.addNewExcluded();
    }
  }

  removeItem(items: ExtendedIncludedEntity[] | ExtendedExcludedEntity[], index: number): void {
    items.splice(index, 1);
    this._filterChanged();
    this._changeDetectorRef.markForCheck();
  }

  removeIncluded(index: number): void {
    this._included.splice(1, index);
  }

  removeExcluded(index: number): void {
    this._excluded.splice(1, index);
  }

  private getFilledCondition(items: IncludedEntity[]) {
    return items.filter(filter => {
      if (filter.strategy === VhdDefineStrategy.empty) {
        return true;
      }
      if (filter.strategy === VhdDefineStrategy.between) {
        return Boolean(filter.value.length) && Boolean(filter.valueTo.length);
      }
      return Boolean(filter.value && filter.value.length);
    });
  }

  /** @hidden */
  private _initializeFilters(filters: VhdFilter[]): void {
    for (const filter of filters) {
      if (filter.include) {
        this._includeFilters.push(filter);
      }
      if (filter.exclude) {
        this._excludeFilters.push(filter);
      }
    }
  }

  /** @hidden Define strategies */
  private _allStrategies(): { label: string; key: VhdDefineStrategy; }[] {
    return Object.entries(VhdDefineStrategy).map(([label, key]) => ({
      key: key,
      label: label
    }));
  };
}

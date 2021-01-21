import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewEncapsulation,
  OnChanges
} from '@angular/core';

import { ContentDensity } from '../../../table/enums';
import { VhdFilter, VdhTableSelection } from '../../models';
import { VhdBaseTab } from '../base-tab/vhd-base-tab.component';
@Component({
  selector: 'fdp-select-tab',
  templateUrl: './select-tab.component.html',
  styleUrls: ['./select-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTabComponent<T> extends VhdBaseTab implements OnChanges {
  @Input()
  selected: T[] = [];

  /** Close dialog immediately after select any row from search table. It'll be skipped if multi option is true */
  @Input()
  selection: VdhTableSelection = 'single';

  /** Text displayed when table has no items. */
  @Input()
  emptyTableMessage = 'Use the search to get results';

  /** Uniq field from data source */
  @Input()
  uniqueKey = 'id';

  /** Items per page for pagination below search table */
  @Input()
  pageSize = 20;

  /** Count of default mobile header from search table */
  @Input()
  defaultMobileHeaders = 2;

  /** The content density for which to render table. 'cozy' | 'compact' | 'condensed' */
  @Input()
  contentTableDensity: ContentDensity = ContentDensity.COMPACT;

  @Input()
  /** Displayed data for search table */
  displayedData: T[] = [];

  /** Event emitted when row was selected. */
  @Output()
  select = new EventEmitter<T[]>();

  /** @hidden */
  _contentDensityOptions = ContentDensity;

  /** @hidden indeterminate flag for `select all` checkbox */
  _selectedAll = false;

  /** @hidden Shown items count in mobile view */
  _shownFrom = 0;

  /** @hidden Shown items count in mobile view */
  _shownCount = 0;

  /** @hidden Current page in desktop view */
  _currentPage = 0;

  /** @hidden Headers and body for search table */
  _tableFilters: {
    main: VhdFilter[],
    secondary: VhdFilter[]
  } = {
    main: [],
    secondary: []
  };

  /** @hidden */
  _selectedMap: { [key: string]: boolean; } = {};

  /** @hidden */
  private selectedItems: T[] = [];

  /** Selection type getters */
  get isSingleSelection(): boolean {
    return this.selection === 'single';
  }
  get isOnceSelection(): boolean {
    return this.selection === 'once';
  }
  get isMultiSelection(): boolean {
    return this.selection === 'multi';
  }

  /** @hidden  */
  ngOnChanges(changes: SimpleChanges): void {
    if ('filters' in changes) {
      this._initializeFilters();
    }
    if ('displayedData' in changes) {
      this._refreshDisplayedData();
    }
    if ('selected' in changes) {
      this.selectedItems = this.selected || [];
      this._refreshSelectedMap();
      this._refreshTristate();
    }
  }

  /** @hidden Track function for main data */
  _trackByTableRowFn(_index: number, item: T): number | string | undefined {
    if (item) {
      return item[this.uniqueKey];
    }

    return undefined;
  }

  /** @hidden Track function for filters */
  _trackByFilterFn(_index: number, item: VhdFilter): number | string | undefined {
    return item && item.key ? item.key : undefined;
  }

  /** @hidden Show more elements */
  _showMoreElements(): void {
    if (this.pageSize && this._shownCount !== this.displayedData.length) {
      this._shownCount += this.pageSize;
      this._shownCount = Math.min(this._shownCount, this.displayedData.length);
    }
  }

  /** @hidden Refresh page in desktop view */
  _updatePage(pageNumber = 1): void {
    this._currentPage = pageNumber;
    this._shownFrom = (pageNumber - 1) * this.pageSize;
    this._shownCount = Math.min(this._shownFrom + this.pageSize, this.displayedData.length);
  }

  /** @hidden Method toggle selected state for all items  */
  _toggleAllRows(): void {
    if (this._selectedAll) {
      this.selectedItems = [];
    } else {
      this.selectedItems = this.displayedData;
    }
    this.select.emit(this.selectedItems);
    this._refreshSelectedMap();
    this._refreshTristate();
  }

  /** @hidden Method toggle selected state for one items  */
  _toggleSelectRow(item: T): void {
    if (this.isMultiSelection) {
      const isSelected = this._selectedMap[item[this.uniqueKey]];
      if (isSelected) {
        this.selectedItems = this.selectedItems.filter((s: T) => s[this.uniqueKey] !== item[this.uniqueKey]);
      } else {
        this.selectedItems.push(item);
      }
      this._selectedMap[item[this.uniqueKey]] = !this._selectedMap[item[this.uniqueKey]];
    } else {
      this._clearSelectedItems();
      this.selectedItems = [item];
    }
    this.select.emit(this.selectedItems);
    this._refreshTristate();
  }

  /** @hidden */
  private _resetShown(): void {
    if (this.mobile) {
      this._showMoreElements();
    } else {
      this._updatePage();
    }
  }

  /** @hidden Manually clear selected items */
  private _clearSelectedItems(): void {
    this._selectedMap = {};
    this.selectedItems = [];
  }

  /** @hidden Refresh indeterminate attribute on `select all` checkbox */
  private _refreshTristate(): void {
    const selected = Object.values(this._selectedMap).filter(Boolean).length;
    if (selected === 0) {
      this._selectedAll = false;
    } else if (selected === this.displayedData.length) {
      this._selectedAll = true;
    } else {
      this._selectedAll = null;
    }
  }

  /** @hidden Set up filters */
  private _initializeFilters(): void {
    if (this.mobile) {
      let _mobileTableHeaders = this.filters.filter(f => f.main).map(f => f.key);
      if (!_mobileTableHeaders.length) {
        _mobileTableHeaders = this.filters.slice(0, this.defaultMobileHeaders).map(f => f.key);
      }
      this._tableFilters = {
        main: this.filters.filter(filter => _mobileTableHeaders.some(key => key === filter.key)),
        secondary: this.filters.filter(filter => !_mobileTableHeaders.some(key => key === filter.key))
      };
    } else {
      this._tableFilters = {
        main: this.filters,
        secondary: []
      }
    }
  }

  /** @hidden Refresh display data */
  private _refreshDisplayedData(): void {
    this._resetShown();
    this._refreshTristate();
  }

  /** @hidden Refresh selected map for display data */
  private _refreshSelectedMap(): void {
    this._selectedMap = {};
    for (const item of this.displayedData) {
      this._selectedMap[item[this.uniqueKey]] = false;
    }
    for (const s of this.selectedItems) {
      this._selectedMap[s[this.uniqueKey]] = true;
    }
  }
}

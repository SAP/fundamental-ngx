import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  HostBinding
} from '@angular/core';

import { ContentDensity } from '../../../table/enums';
import {
  ValueHelpDialogService
} from '../../value-help-dialog.service';
import { ValueHelpDialogTabs, VhdFilter, VdhTableSelection } from '../../models';
import { Subscription } from 'rxjs';

export interface TableRow {
  selected: boolean;
}

@Component({
  selector: 'fdp-select-tab-settings',
  templateUrl: './select-tab-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTabSettingsComponent<T> implements OnDestroy {
  @Input()
  title: string;

  /** Close dialog immediately after select any row from search table. It'll be skipped if multi option is true */
  @Input()
  selection: VdhTableSelection = 'single';

  /** Mobile view for search table */
  @Input()
  mobile = false;

  /** Text displayed when table has no items. */
  @Input()
  emptyTableMessage = 'Use the search to get results';

  /** Uniq field from data source for track in table view */
  @Input()
  uniqueKey = 'id';

  /** Items per page */
  @Input()
  pageSize = 20;

  /** Count of default mobile header from data source */
  @Input()
  defaultMobileHeaders = 2;

  /** The content density for which to render table. 'cozy' | 'compact' | 'condensed' */
  @Input()
  contentTableDensity: ContentDensity = ContentDensity.COMPACT;

  /** Event emitted when row was selected. */
  @Output()
  selectOnce = new EventEmitter<{ selected: T[] }>();

  /** @hidden */
  _contentDensityOptions = ContentDensity;
  /** @hidden Displayed data for search table */
  _displayedData: TableRow[] = [];

  /** @hidden indeterminate flag for `select all` checkbox */
  _selectedAll = false;

  /** @hidden */
  private _selectedMap: Map<string, boolean> = new Map();

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

  /** @hidden All tab's subscriptions */
  private _subscriptions: Subscription;

  /** @hidden Selected items */
  private get _selectedItems(): any {
    return this._stateService.selectedItems$.getValue() || [];
  }
  private set _selectedItems(values) {
    this._stateService.selectedItems$.next(values);
  }

  /** Tab's type */
  get type(): ValueHelpDialogTabs {
    return ValueHelpDialogTabs.selectFromList;
  }

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

  /** @hidden Selection tab filters */
  private _displayedFilters: VhdFilter[] = [];

  constructor(
    private readonly _stateService: ValueHelpDialogService<unknown>,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { }

  /** @hidden  */
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /** @hidden Track function for main data */
  _trackByTableRowFn(_index: number, item: TableRow & { id: number | string }): number | string | undefined {
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
  showMoreElements(): void {
    if (this.pageSize && this._shownCount !== this._displayedData.length) {
      this._shownCount += this.pageSize;
      this._shownCount = Math.min(this._shownCount, this._displayedData.length);
    }
  }

  /** Method toggle selected state for all items  */
  toggleAllRows(): void {
    if (this._selectedItems.length === this._stateService.originalData.length) {
      this._selectedItems = [];
    } else {
      this._selectedItems = this._stateService.originalData;
    }
  }

  /** Refresh page in desktop view */
  updatePage(pageNumber?: number): void {
    this._currentPage = pageNumber;
    this._shownFrom = (pageNumber - 1) * this.pageSize;
    this._shownCount = Math.min(this._shownFrom + this.pageSize, this._displayedData.length);
  }

    /** Method toggle selected state for one items  */
  toggleSelectRow(item: TableRow): void {
    if (!this.isMultiSelection) {
      this._clearSelectedItems();
    }
    if (item.selected) {
      this._selectedItems = this._selectedItems.filter((s: T) => s[this.uniqueKey] !== item[this.uniqueKey]);

    } else {
      const selected = this._selectedItems;
      selected.push(this._getSelectedFromOriginal(item));
      this._selectedItems = selected;
    }

    if (this.isOnceSelection && !this.isMultiSelection) {
      this.selectOnce.emit({ selected: this._getSelectedFromOriginal(item) as T[] });
    }
  }

  /** Method remove selected state for one items  */
  removeSelected(item: TableRow): void {
    item.selected = false;
    this._selectedItems = this._selectedItems.filter((s: T) => s[this.uniqueKey] !== item[this.uniqueKey]);
  }

  /** Manually reset state */
  resetState(): void {
    this._shownFrom = 0;
    this._shownCount = 0;
    this._subscriptions.unsubscribe();
  }

  listenSearchTableEvents(): void {
    this._subscriptions = new Subscription();
    this._subscriptions.add(this._stateService.displayedData$.asObservable().subscribe((data: T[]) => {
      this._refreshDisplayedData(data);
      this.resetShown();
      this._refreshTristate();
      this._changeDetectorRef.markForCheck();
    }));

    this._subscriptions.add(this._stateService.selectedItems$.asObservable().subscribe(() => {
      this.refreshSelectedMap();
      this._refreshDisplayedData(this._displayedData as unknown as T[]);
      this._refreshTristate();
      this._changeDetectorRef.markForCheck();
    }));

    this._subscriptions.add(this._stateService.displayedFilters$.asObservable().subscribe(filters => {
      this._displayedFilters = filters;
      this._initializeFilters();
      this._changeDetectorRef.markForCheck();
    }));
  }

  private resetShown(): void {
    if (this.mobile) {
      this.showMoreElements();
    } else {
      this.updatePage(1);
    }
  }

  /** @hidden Manually clear selected items */
  private _clearSelectedItems(): void {
    if (this._selectedItems.length) {
      this._selectedItems = [];
      this._displayedData = this._displayedData.map(row => {
        row.selected = false;

        return row;
      });
    }
  }

  /** @hidden Get selected items from original data */
  private _getSelectedFromOriginal(item?: TableRow): T | T[] {
    if (item) {
      return this._stateService.originalData.find((original: T) => original[this.uniqueKey] === item[this.uniqueKey]);
    }

    return this._stateService.originalData.filter((original: T) => {
      return this._displayedData.some(row => row[this.uniqueKey] === original[this.uniqueKey] && row.selected);
    })
  }

  /** @hidden Refresh indeterminate attribute on `select all` checkbox */
  private _refreshTristate(): void {
    const visibleSelected = this._selectedMap.size;
    if (visibleSelected === 0) {
      this._selectedAll = false;
    } else if (visibleSelected === this._stateService.originalData.length) {
      this._selectedAll = true;
    } else {
      this._selectedAll = null;
    }
  }

  /** @hidden */
  private _initializeFilters(): void {
    if (this.mobile) {
      let _mobileTableHeaders = this._displayedFilters.filter(f => f.main).map(f => f.key);
      if (!_mobileTableHeaders.length) {
        _mobileTableHeaders = this._displayedFilters.slice(0, this.defaultMobileHeaders).map(f => f.key);
      }
      this._tableFilters = {
        main: this._displayedFilters.filter(filter => _mobileTableHeaders.some(key => key === filter.key)),
        secondary: this._displayedFilters.filter(filter => !_mobileTableHeaders.some(key => key === filter.key))
      };
    } else {
      this._tableFilters = {
        main: this._displayedFilters,
        secondary: []
      }
    }

  }

  private _refreshDisplayedData(data: T[]): void {
    this._displayedData = data.map((row: T&TableRow) => {
      row.selected = this._selectedMap.has(row[this.uniqueKey]);
      return row;
    });
  }

  private refreshSelectedMap(): void {
    this._selectedMap = new Map();
    for (const s of this._selectedItems) {
      this._selectedMap.set(s[this.uniqueKey], true);
    }
  }
}

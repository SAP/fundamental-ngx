import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter,
  SimpleChanges,
  ContentChild,
  ElementRef
} from '@angular/core';
import { Subject, Observable, Subscription, isObservable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService, DialogConfig, DialogRef, RtlService } from '@fundamental-ngx/core';
import { isDataSource } from '../../../domain/data-source';
import { ContentDensity } from '../../table/enums';
import {
  VhdTab,
  VhdValue,
  VhdValueChangeEvent,
  VhdFilter,
  VhdIncludedEntity,
  VhdExcludedEntity,
  VhdDefineStrategy,
  VdhTableSelection,
  ValueHelpDialogDataSource,
  ArrayValueHelpDialogDataSource,
  ObservableValueHelpDialogDataSource
} from '../models';

import { VhdFilterComponent, VhdSearchComponent } from '../components';
import { defaultConditionDisplayFn } from '../constans/condition-display.function';

export type FdpValueHelpDialogDataSource<T> = ValueHelpDialogDataSource<T>
  | ArrayValueHelpDialogDataSource<T>
  | ObservableValueHelpDialogDataSource<T>;

let vhiUniqueId = 0;
@Component({
  selector: 'fdp-value-help-dialog',
  templateUrl: './value-help-dialog.component.html',
  styleUrls: ['./value-help-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformValueHelpDialogComponent<T> implements OnChanges, OnDestroy {
  /** Id of the popover */
  @Input()
  id: string = 'fdp-vhd-' + vhiUniqueId++;

  /** Initial state of Value help dialog */
  @Input()
  value: VhdValue<T[]> = {
    selected: [],
    included: [],
    excluded: []
  };

  /** Dialog title */
  @Input()
  dialogTitle: string;

  /** Select from list tab activation */
  @Input()
  initialTab = VhdTab.selectFromList;

  /** Visible tabs */
  @Input()
  tabs: 'both' | 'select' | 'define' = 'both';

  /** Initial expand state for advanced search panel */
  @Input()
  isOpenAdvanced = true;

  /** Data source */
  @Input()
  get dataSource(): FdpValueHelpDialogDataSource<any> {
    return this._dataSource;
  }
  set dataSource(value: FdpValueHelpDialogDataSource<any>) {
    if (value) {
      this._dataSource = this.toDataStream(value);
    }
  }

  /** Dialog's custom config */
  @Input()
  dialogConfig: DialogConfig = {};

  /** Unique key from the source field names. Required field. */
  @Input()
  uniqueKey: string;

  /** Field name for default render from data.
   * Required field if tokenizerFn is not exist. */
  @Input()
  tokenViewField: string;

  /** Tokenizer function for custom token render, it has higher prio that `tokenViewField`.
   * Required field if tokenViewField is not exist. */
  @Input()
  tokenizerFn: Function;

  /** Whether the value help dialog should be view in mobile mode */
  @Input()
  mobile = false;

  /** It should be able if you use multiple selection */
  @Input()
  formatToken: Function;

  /** Tokenizer function for include/exclude token render */
  @Input()
  conditionDisplayFn: Function = defaultConditionDisplayFn;

  /**
   * Select from list tab's and Search table settings
   * */
  @Input()
  selectTabTitle = 'Select from list';

  /** Selection mode for search table */
  @Input()
  searchSelection: VdhTableSelection = 'multi';

  /** Text displayed when table has no items. */
  @Input()
  searchTableEmptyMessage = 'Use the search to get results';

  /** Items per page for pagination below search table */
  @Input()
  searchTablePageSize = 20;

  /** Count of default mobile header from search table */
  @Input()
  searchTableMobileHeaders = 2;

  /** The content density for which to render table. 'cozy' | 'compact' | 'condensed' */
  @Input()
  searchTableDensity: ContentDensity = ContentDensity.COMPACT;

  /** Define conditions tab's settings */
  @Input()
  defineTabTitle = 'Define Conditions';

  /** Custom stratagies labels
   * Allowed keys: contains, equalTo, between, startsWith, endsWith, lessThan, lessThanEqual, greaterThan, greaterThanEqual, empty
   */
  @Input()
  defineStrategyLabels: {[key in keyof typeof VhdDefineStrategy]?: string} = {
    contains: 'contains',
    equalTo: 'equal to',
    between: 'between',
    startsWith: 'starts with',
    endsWith: 'ends with',
    lessThan: 'less than',
    lessThanEqual: 'less than or equal to',
    greaterThan: 'greater than',
    greaterThanEqual: 'greater than or equal to',
    empty: 'empty'
  };

  /** Dialog outputs */
  /** Event emitted when filters/tokens were changed. */
  @Output()
  valueChange = new EventEmitter<VhdValueChangeEvent>();

  /** @hidden Search control component  */
  @ContentChild(VhdSearchComponent)
  searchField: VhdSearchComponent;

  /** @hidden Fitlers for search table and defince conditions */
  @ContentChildren(VhdFilterComponent)
  filters: QueryList<VhdFilterComponent>;

  /** @hidden Internal container for dialog */
  @ViewChild('container', { read: TemplateRef })
  dialogContainer: TemplateRef<any>;

  /** @hidden */
  activeDialog: DialogRef;

  /** @hidden */
  _tabTypes = VhdTab;

  /** @hidden */
  _hasAdvanced = true;

  /** @hidden */
  _hasDefineFilters = true;

  /** @hidden */
  _selectedExpandState = true;

  /** @hidden */
  _displayedFilters: VhdFilter[] = [];

  /** @hidden */
  _displayedData: T[] = [];

  /** @hidden */
  _mainSearch = '';

  /** handles rtl service
     * @hidden */
  _dir = 'ltr';

  /** @hidden */
  private _destroyed = new Subject<void>();

  /** @hidden */
  private _dataSource: FdpValueHelpDialogDataSource<any>;

  /** @hidden for data source handling */
  private _dsSubscription: Subscription;

  /** @hidden Previous state */
  private _prevState: VhdValue<T[]> = {
    selected: [],
    included: [],
    excluded: []
  };
  /** @hidden Current data for local manupulation */
  private _currentValue: VhdValue<T[]> = {
    selected: [],
    included: [],
    excluded: []
  };

  selectedTab: VhdTab = null;

  /** @hidden */
  constructor (
    private readonly _elementRef: ElementRef,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _dialogService: DialogService,
    private readonly _rtlService: RtlService,
  ) {
    /** Default display function for define conditions */
    if (!this.conditionDisplayFn || typeof this.conditionDisplayFn !== 'function') {
      this.conditionDisplayFn = defaultConditionDisplayFn;
    }
  }

  /** @hidden */
  get isMobileAdvancedSearchActive(): boolean {
    if (this.mobile) {
      return this.isOpenAdvanced;
    }
    return false;
  }

  /** @hidden */
  get hasSelectedTab(): boolean {
    return this.selectedTab in VhdTab;
  }

  /** @hidden */
  get showSelectionTab(): boolean {
    return this.tabs !== 'define';
  }

  /** @hidden */
  get showDefineTab(): boolean {
    return this._hasDefineFilters && this.tabs !== 'select';
  }

  /** @hidden */
  get isSelectionTab(): boolean {
    return this.selectedTab === VhdTab.selectFromList || this.selectedTab === VhdTab.advancedSearch;
  }

  /** @hidden */
  get selectedItems(): T[] {
    return this._currentValue.selected || [];
  }

  /** @hidden */
  get includedItems(): VhdIncludedEntity[] {
    return this._currentValue.included || [];
  }

  /** @hidden */
  get validIncludedItems(): VhdIncludedEntity[] {
    return this._getValidCondition(this.includedItems);
  }

  /** @hidden */
  get excludedItems(): VhdExcludedEntity[] {
    return this._currentValue.excluded || [];
  }

  /** @hidden */
  get validExcludedItems(): VhdExcludedEntity[] {
    return this._getValidCondition(this.excludedItems);
  }

  /** @hidden */
  get selectedAndIncluded(): number {
    return this.selectedItems.length + this.validIncludedItems.length;
  }

  /** @hidden */
  get hasSelectedAndConditions(): boolean {
    return Boolean(this.validExcludedItems.length || this.selectedItems.length || this.includedItems.length);
  }

  /** @hidden */
  get elementRef(): ElementRef<any> {
      return this._elementRef;
  }

  /** @hidden */
  get isOpen(): boolean {
    return !!this.activeDialog;
  }

  /** @hidden */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      if ('dataSource' in changes) {
        this._initializeDS();
      }
    }
  }

  /** @hidden */
  ngOnDestroy(): void {
    this._resetState();
  }

  /** Open dialog */
  open(): void {
    if (!this.isValidOptions()) {
      throw new Error('Please check required fields');
    }
    if (this.isOpen) {
      return;
    }
    this._savePreviousState();
    this._updateFilters();
    this._initializeDS();
    this._initializeTab();
    this.activeDialog = this._dialogService.open(this.dialogContainer, {
      backdropClickCloseable: false,
      hasBackdrop: true,
      verticalPadding: false,
      escKeyCloseable: false,
      dialogPanelClass: `fdp-value-help-dialog ${this.mobile ? 'fdp-value-help-dialog-mobile' : ''}`,
      ...this.dialogConfig,

      fullScreen: this.mobile,
      maxWidth: this.mobile ? null : '92%',
      width: this.mobile ? null : '1080px',
      height: this.mobile ? null : '98%',
    });
    this._listenDialogEvents();
  }

  /**
   * Toggle panel with selected and excluded items
   */
  toggleSelectedPanel(): void {
    const selectedCount = this.selectedAndIncluded !== 0;
    const excludedCount = this.validExcludedItems.length !== 0;

    if (selectedCount || excludedCount) {
      this._selectedExpandState = !this._selectedExpandState;
    }
  }

  /**
   * Toggle advanced search panel
   */
  toggleAdvancedSearch(state?: boolean): void {
    if (typeof state !== 'undefined') {
      this.isOpenAdvanced = state;
    } else {
      this.isOpenAdvanced = !this.isOpenAdvanced;
    }

    if (this.mobile) {
      this.selectedTab = this.isOpenAdvanced ? VhdTab.advancedSearch : VhdTab.selectFromList;
    }
  }

  /**
   * Clear all selected items
   */
  clearSelectedItems(): void {
    this._currentValue.selected = [];
    this._currentValue.included = [];
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Clear all excluded items
   */
  clearExcludedItems(): void {
    if (this.validExcludedItems.length) {
      this._currentValue.excluded = [];
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Bacis search by all filled filters
   */
  search(): void {
    const nonEmptyFilters = new Map();
    this._displayedFilters.filter(({ value }) => !!value && value.trim().length).forEach(filter => {
      nonEmptyFilters.set(filter.key, filter.value);
    });

    if (this._mainSearch.length) {
      nonEmptyFilters.set('*', this._mainSearch);
    }
    this.dataSource.match(nonEmptyFilters);
  }

  /**
   * Apply search from advanced filters view, using when mobile view is active
   */
  searchAdvanced(): void {
    this.search();
    this.selectedTab = VhdTab.selectFromList;
    this.isOpenAdvanced = false;
  }

  /** Remove item from selected array */
  removeSelected(index: number): void {
    this._currentValue.selected = this.selectedItems.filter((_, i) => i !== index);
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove included items
   */
  removeIncluded(index: number): void {
    this._currentValue.included = this.includedItems.filter((_, i) => i !== index);
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove excluded items
   */
  removeExcluded(index: number): void {
    this._currentValue.excluded = this.excludedItems.filter((_, i) => i !== index);
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Switch tab by type
   */
  switchTab(type: VhdTab = null): void {
    this.selectedTab = type;
  }

  /**
   * Close dialog with value;
   */
  success(): void {
    if (this.activeDialog) {
      const value: VhdValueChangeEvent = {
        selected: this.selectedItems,
        included: this.validIncludedItems,
        excluded: this.validExcludedItems
      };
      if (this.formatToken && typeof this.formatToken === 'function') {
        return this.activeDialog.close(this.formatToken(value));
      }
      this.activeDialog.close(value);
    }
  }

  /**
   * Hide advanced search on mobile view and if it's opened
   * Close dialog with null value;
   */
  dismiss(): void {
    if (this.mobile && this.isOpenAdvanced) {
      this.isOpenAdvanced = false;
      this.switchTab(VhdTab.selectFromList);
    } else {
      this._currentValue = this._prevState;
      if (this.activeDialog) {
        this.activeDialog.close();
      }
    }
  }

  /** @hidden */
  _trackByFilterFn(_index: number, item: VhdFilter): number | string {
    return item && item.key;
  }
  /** @hidden */
  _trackByConditionFn(_index: number, item: VhdIncludedEntity | VhdExcludedEntity): number | string | undefined {
    return item ? item.value + item.valueTo + item.strategy + item.key : undefined;
  }

  /** @hidden */
  onSelect($event: T[]): void {
    this._currentValue.selected = $event;
    this._changeDetectorRef.markForCheck();
    if (this.searchSelection === 'once') {
      this.success();
    }
  }

  /** @hidden */
  onIncludeChange($event: VhdIncludedEntity[]): void {
    this._currentValue.included = $event;
    this._changeDetectorRef.markForCheck();
  }

  /** @hidden */
  onExcludeChange($event: VhdExcludedEntity[]): void {
    this._currentValue.excluded = $event;
    this._changeDetectorRef.markForCheck();
  }

  /** @hidden */
  private _getValidCondition(items: VhdIncludedEntity[] | VhdExcludedEntity[] = []): VhdIncludedEntity[] {
    return items.filter(item => {
      if (item.strategy === VhdDefineStrategy.empty) {
        return true;
      }
      if (!item.valid) {
        return false;
      }
      if (item.strategy === VhdDefineStrategy.between) {
        return Boolean(item.value.length && item.valueTo.length);
      }
      return Boolean(item.value.length);
    });
  }

  /** @hidden */
  private _initializeDS(ds: FdpValueHelpDialogDataSource<any> = this.dataSource): void {
    this._resetSourceStream();
    if (this.showSelectionTab) {
      this._dsSubscription = this.openDataStream(ds)
        .pipe(takeUntil(this._destroyed))
        .subscribe(data => {
          this._displayedData = data.slice();
          this._changeDetectorRef.markForCheck();
        });
    }
  }

  /** @hidden Save previous state */
  private _savePreviousState(): void {
    const value = JSON.parse(JSON.stringify(this.value));
    this._currentValue = value;
    this._prevState = value;
  }

  /** @hidden */
  private _initializeTab(): void {
    if (this.mobile) {
      this.isOpenAdvanced = false;
    }
    if (this.showSelectionTab && this.showDefineTab) {
      this.switchTab(this.mobile ? null : this.initialTab);
    } else if (this.showSelectionTab) {
      this.switchTab(VhdTab.selectFromList);
    } else if (this.showDefineTab) {
      this.switchTab(VhdTab.defineConditions);
    }
  }

  /** @hidden */
  private _listenDialogEvents(): void {
    if (!this.activeDialog) {
      return;
    }
    this.activeDialog.afterClosed
      .pipe(takeUntil(this._destroyed))
      .subscribe(value => {
        if (value) {
          this.value = value;
          this.valueChange.emit(value);
        }

        this._resetState();
      });
    this.filters.changes
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._updateFilters();
      })

    this._dir = this._rtlService.rtl.getValue() ? 'rtl' : 'ltr';
    this._rtlService.rtl
      .pipe(takeUntil(this._destroyed))
      .subscribe((isRtl: boolean) => {
          this._dir = isRtl ? 'rtl' : 'ltr';
      });
  }

  /** @hidden */
  private _resetState(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this._resetSourceStream();
    this.activeDialog = undefined;
  }

  /** @hidden */
  private _updateFilters(): void {
    this._displayedFilters = this.filters.map(filter => ({
      ...filter,
      label: filter.label || filter.key
    }));

    this._hasAdvanced = this._displayedFilters.some((filter: VhdFilter) => {
      return !!filter.advanced;
    });
    this._hasDefineFilters = this._displayedFilters.some((filter: VhdFilter) => {
      return !!filter.include || !!filter.exclude;
    });
  }

  /** @hidden */
  private openDataStream(ds: FdpValueHelpDialogDataSource<T>): Observable<T[]> {
    if (this._dataSource) {
      this._dataSource.match();

      return this._dataSource.open();
    }
    throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
  }

  /** @hidden */
  private toDataStream(ds: FdpValueHelpDialogDataSource<T>): FdpValueHelpDialogDataSource<T> {
    if (isDataSource(ds)) {
      return ds as ValueHelpDialogDataSource<T>;
    } else if (Array.isArray(ds)) {
      return new ArrayValueHelpDialogDataSource<T>(ds);
    } else if (isObservable(ds)) {
      return new ObservableValueHelpDialogDataSource<T>(ds);
    }

    return undefined;
  }

  /** @hidden */
  private _resetSourceStream(): void {
    if (isDataSource(this.dataSource)) {
      this.dataSource.close();
    }
    if (this._dsSubscription) {
      this._dsSubscription.unsubscribe();
      this._dsSubscription = null;
    }
  }

  private isValidOptions(): boolean {
    if (this.showSelectionTab) {
      return this.dataSource &&
        typeof this.uniqueKey === 'string' &&
        (typeof this.tokenViewField === 'string' || typeof this.tokenizerFn === 'function');
    }
    return true;
  }
}

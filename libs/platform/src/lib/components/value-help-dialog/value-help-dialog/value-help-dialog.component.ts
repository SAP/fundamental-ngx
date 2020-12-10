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
  AfterContentInit,
  Output,
  EventEmitter,
  SimpleChanges,
  ContentChild
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService, DialogConfig, DialogRef } from '@fundamental-ngx/core';
import { isDataSource } from '../../../domain/data-source';
import { ValueHelpDialogTabs, VhdValueChangeEvent, VhdFilter, IncludedEntity, ExcludedEntity, VhdDefineStrategy } from '../models';

import {
  ValueHelpDialogService,
  FdpValueHelpDialogDataSource
} from '../value-help-dialog.service';
import {
  VhdFilterComponent,
  SelectTabSettingsComponent,
  TableRow,
  DefineTabSettingsComponent,
  VhdSearchComponent
} from '../components';

let vhiUniqueId = 0;
@Component({
  selector: 'fdp-value-help-dialog',
  templateUrl: './value-help-dialog.component.html',
  styleUrls: ['./value-help-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ValueHelpDialogService
  ]
})
export class PlatformValueHelpDialogComponent<T> implements OnChanges, OnDestroy, AfterContentInit {
  constructor(
    private readonly _stateService: ValueHelpDialogService<unknown>,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _dialogService: DialogService
  ) {
    this._stateService.setUid();
  }

  /** Id of the popover */
  @Input()
  id: string = 'fdp-vhd-' + vhiUniqueId++;

  /** Reference to popover trigger element */
  @Input()
  value: VhdValueChangeEvent<T[]>;

  /** Dialog title */
  @Input()
  dialogTitle: string;

  /** Select from list tab activation */
  @Input()
  initialTab = ValueHelpDialogTabs.selectFromList;

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
      this._dataSource = value;
    }
  }

  /** Dialog's custom config */
  @Input()
  dialogConfig: DialogConfig = {};

  /** Unique key from the source field names */
  @Input()
  uniqueKey = 'id';

  /** Field name for default render from data */
  @Input()
  tokenViewField = 'name';

  /** Tokenizer function for custom token render, it has higher prio that `tokenViewField` */
  @Input()
  tokenizerFn: Function;

  /** Tokenizer function for include/exclude token render */
  @Input()
  conditionDisplayFn = (item: IncludedEntity | ExcludedEntity, filters: VhdFilter[]) => {
    const filter = filters.find(f => f.key === item.key);
    let value = (() => {
      switch (item.strategy) {
        case VhdDefineStrategy.empty:
          return null;
        case VhdDefineStrategy.between:
          return `${item.value}...${item.valueTo}`;
        case VhdDefineStrategy.contains:
          return `*${item.value}*`;
        case VhdDefineStrategy.equalTo:
          return `=${item.value}`;
        case VhdDefineStrategy.startsWith:
          return `${item.value}*`;
        case VhdDefineStrategy.endsWith:
          return `*${item.value}`;
        case VhdDefineStrategy.greaterThan:
          return `>${item.value}`;
        case VhdDefineStrategy.greaterThanEqual:
          return `>=${item.value}`;
        case VhdDefineStrategy.lessThan:
          return `<${item.value}`;
        case VhdDefineStrategy.lessThanEqual:
          return `<=${item.value}`;
      }
    })();
    if (value && item.type === 'exclude') {
      value = `!(${value})`;
    }
    if (filter) {
      return `${filter.label}: ${value}`;
    }

    return value;
  }

  /** Whether the value help dialog should be view in mobile mode */
  @Input()
  mobile = false;

  /** Event emitted when filters/tokens were changed. */
  @Output()
  valueChange = new EventEmitter<VhdValueChangeEvent>();

  /** @hidden Search control component  */
  @ContentChild(VhdSearchComponent)
  searchField: VhdSearchComponent;

  /** @hidden Fitlers for search table and defince conditions */
  @ContentChildren(VhdFilterComponent)
  filters: QueryList<VhdFilterComponent>;

  /** @hidden Select from list tab settings */
  @ContentChild(SelectTabSettingsComponent)
  selectionTab: SelectTabSettingsComponent<unknown>;

  /** @hidden Define conditions tab settings */
  @ContentChild(DefineTabSettingsComponent)
  defineTab: DefineTabSettingsComponent<unknown>;

  /** @hidden Internal container for dialog */
  @ViewChild('container', { read: TemplateRef })
  private dialogContainer: TemplateRef<any>;

  /** @hidden */
  activeDialog: DialogRef;
  /** @hidden */
  _tabTypes = ValueHelpDialogTabs;
  /** @hidden */
  _hasAdvanced = true;
  /** @hidden */
  _hasDefineFilters = true;
  /** @hidden */
  _selectedExpandState = true;
  /** @hidden */
  _displayedFilters: VhdFilter[] = [];
  /** @hidden */
  _displayedData: TableRow[] = [];
  /** @hidden */
  _mainSearch = '';
  /** @hidden */
  private _destroyed = new Subject<void>();
  /** @hidden */
  protected _dataSource: FdpValueHelpDialogDataSource<any>;
  /** @hidden for data source handling */
  private _dsSubscription: Subscription;
  /** @hidden */
  get _originalData(): any {
    return this._stateService.originalData;
  };
  /** @hidden */
  get selectedTab(): ValueHelpDialogTabs {
    return this._stateService.selectedTab$.getValue();
  };
  /** @hidden */
  set selectedTab(type: ValueHelpDialogTabs | undefined) {
    this._stateService.selectedTab$.next(type);
  };
  /** @hidden */
  get isMobileAdvancedSearchActive(): boolean {
    if (this.mobile) {
      return this.isOpenAdvanced;
    }
    return false;
  }
  /** @hidden */
  get hasSelectedTab(): boolean {
    return this.selectedTab in ValueHelpDialogTabs;
  }
  /** @hidden */
  get hasSelectionTab(): boolean {
    return !!this.selectionTab;
  }
  /** @hidden */
  get hasDefineTab(): boolean {
    return !!this.defineTab && this._hasDefineFilters;
  }
  /** @hidden */
  get isSelectionTab(): boolean {
    return this.selectedTab === ValueHelpDialogTabs.selectFromList || this.selectedTab === ValueHelpDialogTabs.advancedSearch;
  }
  /** @hidden */
  get selectedItems(): any {
    return this._stateService.selectedItems$.getValue() || [];
  }
  /** @hidden */
  get includedItems(): any {
    return this._stateService.includedItems$.getValue() || [];
  }
  /** @hidden */
  get excludedItems(): any {
    return this._stateService.excludedItems$.getValue() || [];
  }
  /** @hidden */
  get isOpen(): boolean {
    return !!this.activeDialog;
  }

  open(): void {
    /** Avoid to open duplicate */
    if (this.activeDialog) {
      return;
    }
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

  /** @hidden */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      if ('dataSource' in changes) {
        this.updateOriginalSource();
      }
      if ('value' in changes) {
        this._stateService.refreshState(this.value);
      }
    }
  }

  /** @hidden */
  ngAfterContentInit(): void {
    if (this.isOpen) {
      this._stateService.refreshState(this.value);
    }
    if (this.selectionTab) {
      this.selectionTab.uniqueKey = this.uniqueKey;
    }
  }
  /** @hidden */
  ngOnDestroy(): void {
    this._resetState();
  }

  /**
   * Toggle panel with selected and excluded items
   */
  toggleSelectedPanel(): void {
    const selectedCount = this.selectedItems.length !== 0;
    const excludedCount = this.excludedItems && this.excludedItems.length !== 0;

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
      this.selectedTab = this.isOpenAdvanced ? ValueHelpDialogTabs.advancedSearch : ValueHelpDialogTabs.selectFromList;
    }
  }

  /**
   * Clear all selected items
   */
  clearSelectedItems(): void {
    if (this.selectedItems.length) {
      this._stateService.selectedItems$.next([]);
      this._displayedData = this._displayedData.map(row => {
        row.selected = false;

        return row;
      });
      this._stateService.displayedData$.next(this._displayedData);
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Clear all excluded items
   */
  clearExcludedItems(): void {
    if (this.excludedItems && this.excludedItems.length) {
      this._stateService.excludedItems$.next([]);
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Bacis search by all filled filters
   */
  onSearch(): void {
    const nonEmptyFilters = new Map();
    this._displayedFilters.filter(({ value }) => !!value).forEach(filter => {
      nonEmptyFilters.set(filter.key, filter.value);
    });

    if (this._mainSearch.length) {
      nonEmptyFilters.set('*', this._mainSearch);
    }
    this._stateService.dataSource.match(nonEmptyFilters);
  }

  /**
   * Apply search from advanced filters view, using when mobile view is active
   */
  onSearchAdvanced(): void {
    this.onSearch();
    this.selectedTab = ValueHelpDialogTabs.selectFromList;
    this.isOpenAdvanced = false;
  }

  /**
   * Remove included items
   */
  removeIncluded(index: number): void {
    this._stateService.includedItems$.next(this.includedItems.filter((_, i: number) => i !== index));
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove excluded items
   */
  removeExcluded(index: number): void {
    this._stateService.excludedItems$.next(this.excludedItems.filter((_, i: number) => i !== index));
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Switch tab by type
   */
  switchTab(type?: ValueHelpDialogTabs): void {
    this.selectedTab = type;
  }

  /**
   * Close dialog with value;
   */
  success(): void {
    const value: VhdValueChangeEvent = {};
    if (this.selectedItems.length) {
      value.selected = this.selectedItems;
    }
    if (this.includedItems.length) {
      value.included = this.includedItems;
    }
    if (this.excludedItems.length) {
      value.excluded = this.excludedItems;
    }
    if (this.activeDialog) {
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
    } else {
      if (this.activeDialog) {
        this.activeDialog.close();
      }
    }
  }

  /** Remove item from selected array */
  removeSelected(item: T): void {
    this._stateService.selectedItems$.next(this.selectedItems.filter((s: T) => s[this.uniqueKey] !== item[this.uniqueKey]));
    this._changeDetectorRef.markForCheck();
  }

  /** @hidden */
  _trackByFilterFn(_index: number, item: VhdFilter): number | string | undefined {
    return item && item.key ? item.key : undefined;
  }
  /** @hidden */
  _trackByConditionFn(_index: number, item: IncludedEntity | ExcludedEntity): number | string | undefined {
    return item ? item.value + item.valueTo + item.strategy + item.key : undefined;
  }

  /** @hidden */
  _initializeDS(ds: FdpValueHelpDialogDataSource<any> = this.dataSource): void {
    this._resetSourceStream();
    this._dsSubscription = this._stateService.initializeDS(ds)
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._refreshDisplayedData();
      });
  }

  /** @hidden */
  private _refreshDisplayedData(): void {
    this._displayedData = this._originalData.map((row: T & TableRow) => {
      row.selected = this.selectedItems.some((item: T) => item[this.uniqueKey] === row[this.uniqueKey]);

      return row;
    });
    this._stateService.displayedData$.next(this._displayedData);
    this._changeDetectorRef.markForCheck();
  }

  /** @hidden */
  private _initializeTab(): void {
    if (this.mobile) {
      this.switchTab();
      this.isOpenAdvanced = false;
    } else {
      this.switchTab(this.selectionTab ? ValueHelpDialogTabs.selectFromList : ValueHelpDialogTabs.defineConditions);
    }

    if (this.hasSelectionTab) {
      this.selectionTab.mobile = this.mobile;
      this.selectionTab.listenEvents();
    }

    if (this.hasDefineTab) {
      this.defineTab.mobile = this.mobile;
      this.defineTab.listenEvents();
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
          this.valueChange.emit(this.value);
        }

        this._resetState();
      });
    if (this.selectionTab) {
      this.selectionTab.selectOnce
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => {
          this.success();
        })
    }
    this.filters.changes
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._updateFilters();
      })
  }

  /** @hidden */
  private _resetState(): void {
    this._destroyed.next();
    this._destroyed.complete();

    if (this.selectionTab) {
      this.selectionTab.resetState();
      this.selectedTab = undefined;
    }
    this._resetSourceStream();

    this.activeDialog = undefined;
  }

  /** @hidden */
  private updateOriginalSource(): void {
    this._initializeDS();
  }

  /** @hidden */
  private _updateFilters(filters?: VhdFilter[]): void {
    const _filters = filters || (this.filters ? this.filters.toArray() : []);
    this._displayedFilters = _filters.map(filter => ({
      ...filter,
      label: filter.label || filter.key,
      value: filter.value || ''
    }));
    this._stateService.displayedFilters$.next(this._displayedFilters)

    this._hasAdvanced = this._displayedFilters.some((filter: VhdFilter) => {
      return !!filter.advanced;
    });
    this._hasDefineFilters = this._displayedFilters.some((filter: VhdFilter) => {
      return !!filter.include || !!filter.exclude;
    });
  }

  /** @hidden */
  private _resetSourceStream(): void {
    if (isDataSource(this._stateService.dataSource)) {
      this._stateService.dataSource.close();
    }
    if (this._dsSubscription) {
      this._dsSubscription.unsubscribe();
      this._dsSubscription = null;
    }
  }
}

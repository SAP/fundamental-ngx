import {
  Component,
  ContentChildren,
  AfterContentInit,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  SimpleChanges,
  ContentChild
} from '@angular/core';
import { isObservable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService, DialogConfig, DialogRef } from '@fundamental-ngx/core';

import { ContentDensity } from '../../table/enums';
import { isDataSource } from '../../../domain/data-source';
import {
  ValueHelpDialogDataSource,
  ArrayValueHelpDialogDataSource,
  ObservableValueHelpDialogDataSource
} from '../models';
import { VhdFilter, PlatformVhdFilterComponent } from '../components/value-help-dialog-filter/value-help-dialog-filter.component';
import {
  ValueHelpDialogService,
  ValueHelpDialogTabs,
  VhdValueChangeEvent,
  FdpValueHelpDialogDataSource
} from '../state.service';
import { SelectTabSettingsComponent } from '../components/select-tab-settings/select-tab-settings.component';
import { DefineTabSettingsComponent } from '../components/define-tab-settings/define-tab-settings.component';

let vhiUniqueId = 0;
interface TableRow {
  selected: boolean;
}

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
export class PlatformValueHelpDialogComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
  /** Id of the popover. If none is provided, one will be generated. */
  @Input()
  id: string = 'fdp-vhd-' + vhiUniqueId++;
  constructor(
    private readonly _stateService: ValueHelpDialogService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _dialogService: DialogService
  ) { }
  /** Reference to popover trigger element */
  @Input()
  triggerElement: ElementRef;

  /** Dialog title */
  @Input()
  dialogTitle: string;

  /** Select from list tab activation */
  @Input()
  selection = true;

  /** Define conditions tab activation */
  @Input()
  define = false;

  /** @hidden
  * The content density for which to render table. 'cozy' | 'compact' | 'condensed'
  */
  @Input()
  contentTableDensity: ContentDensity = ContentDensity.COMPACT;

  /** Text displayed when table has no items. */
  @Input()
  emptyTableMessage = 'Use the search to get results';

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

  /** Field name for default render from data */
  @Input()
  tokenViewField = 'name';

  /** Tokenizer function for custom token render, it has higher prio that `tokenViewField` */
  @Input()
  tokenizerFn: Function;

  /** Uniq field from data source for track */
  @Input()
  uniqField = 'id';

  /** Whether the value help dialog should be view in mobile mode */
  @Input()
  mobile = false;

  /** Items per page, it's equal to data source length for desktop mode */
  @Input()
  itemPerPage = 20;

  /** Event emitted when show more items fired. */
  @Output()
  showMore = new EventEmitter<{ shownCount: number}>();

  /** Event emitted when filters/tokens were changed. */
  @Output()
  valueChange = new EventEmitter<VhdValueChangeEvent>();

  /** Fitlers for  */
  @ContentChildren(PlatformVhdFilterComponent)
  filters: QueryList<PlatformVhdFilterComponent>;

  @ContentChild(SelectTabSettingsComponent)
  selectionTab: SelectTabSettingsComponent;

  @ContentChild(DefineTabSettingsComponent)
  defineTab: DefineTabSettingsComponent;

  /** @hidden
   * Internal container for dialog
  */
  @ViewChild('container', { read: TemplateRef })
  container: TemplateRef<any>;


  hasAdvanced = true;
  hasInclude = true;
  hasExclude = true;
  selectedExpandState = true;

  selectedTab: ValueHelpDialogTabs;
  displayedFilters: VhdFilter[] = [];
  displayedData: TableRow[] = [];
  selectedAll = false;
  indeterminateData = false;
  activeDialog: DialogRef;


  private _shownCount = 0;
  /** Whether the value help dialog should be view in mobile mode */
  private _mobileTableHeaders: string[];
  private _tableFilters: {
    header: VhdFilter[],
    bodyHead: VhdFilter[],
    bodyCell: VhdFilter[]
  } = {
      header: [],
      bodyHead: [],
      bodyCell: []
    };
  /** @hidden */
  private _destroyed = new Subject<void>();
  /** @hidden */
  protected _dataSource: FdpValueHelpDialogDataSource<any>;
  /** @hidden */
  protected _originalDataSource: FdpValueHelpDialogDataSource<any>;
  /** @hidden */
  private _originalData = [];
  /** @hidden for data source handling */
  private _dsSubscription: Subscription
  private _currentValue: VhdValueChangeEvent = {
    selected: [],
    excluded: []
  };;

  get tabTypes() {
    return ValueHelpDialogTabs;
  }

  get isMobileAdvancedSearchActive(): boolean {
    if (this.mobile) {
      return this.isOpenAdvanced;
    }
    return false;
  }
  get tableFilters() {
    return this._tableFilters;
  }

  get hasSelectedTab(): boolean {
    return typeof this.selectedTab !== 'undefined';
  }

  get isSelectionTab(): boolean {
    return this.selectedTab === ValueHelpDialogTabs.selectFromList || this.selectedTab === ValueHelpDialogTabs.advancedSearch;
  }

  get selectedItems(): any {
    return this._currentValue.selected;
  }

  get excludedItems(): any {
    return this._currentValue.excluded;
  }

  get selectionTableMode(): string {
    return this.selectionTab.multi ? 'multi' : 'single';
  }

  get isOpen(): boolean {
    return !!this.activeDialog
  }

  open(): void {
    this._initializeDS(this.dataSource);
    this._initializeTab();
    this.activeDialog = this._dialogService.open(this.container, {
      backdropClickCloseable: false,
      hasBackdrop: true,
      verticalPadding: false,
      escKeyCloseable: false,
      dialogPanelClass: `fdp-value-help-dialog ${this.mobile ? 'fdp-value-help-dialog-mobile' : ''}`,
      ...this.dialogConfig,

      fullScreen: this.mobile,
      maxWidth: this.mobile ? null : '75%',
      maxHeight: this.mobile ? null : '730px',
      width: this.mobile ? null : '1230px',
      height: null
    });
    this._listenDialogEvents();
  }
  /** @hidden */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen && 'dataSource' in changes) {
      this.updateOriginalSource();
    }
  }
  /** @hidden */
  ngAfterContentInit(): void {
    this.checkFilters();
  }
  /** @hidden */
  ngOnInit(): void {

  }
  /** @hidden */
  ngOnDestroy(): void {
    this._resetState();
  }

  toggleSelectedPanel(): void {
    const selectedCount = this._currentValue.selected.length !== 0;
    const excludedCount = this._currentValue.excluded.length !== 0;

    if (selectedCount || excludedCount) {
      this.selectedExpandState = !this.selectedExpandState;
    }
  }

  toggleAdvancedSearch(state?: boolean): void {
    if (typeof state !== 'undefined') {
      this.isOpenAdvanced = state;
    } else {
      this.isOpenAdvanced = !this.isOpenAdvanced;
    }
  }

  clearSelectedItems(): void {
    if (this._currentValue.selected.length) {
      this._currentValue.selected = [];
      this.displayedData = this.displayedData.map(row => {
        row.selected = false;

        return row;
      });
      this.selectedAll = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  clearExcludedItems(): void {
    this._currentValue.excluded = [];
    this._changeDetectorRef.markForCheck();
  }

  onSearch(): void {
    const nonEmptyFilters = this.displayedFilters.filter(({ value }) => !!value).reduce((acc, filter) => {
      acc.set(filter.key, filter.value);

      return acc;
    }, new Map());
    this.dataSource.match(nonEmptyFilters);
    this.toggleAdvancedSearch(this.mobile ? false : undefined);
    if (this.mobile) {
      if (this.isOpenAdvanced) {
        this.selectedTab = ValueHelpDialogTabs.advancedSearch;
      } else {
        this.selectedTab = ValueHelpDialogTabs.selectFromList;
      }
    }
  }

  refreshDisplayedData(): void {
    const original = JSON.parse(JSON.stringify(this._originalData)) as TableRow[];
    this.displayedData = original.map(row => {
      row.selected = this._currentValue.selected.some(({ key }) => key === row[this.uniqField]);

      return row;
    });

    this.showMoreElements();
  }

  toggleAllRows(): void {
    if (this._currentValue.selected.length === this._originalData.length) {
      this.selectedAll = false;
    } else {
      this.selectedAll = true;
    }

    this.displayedData = this.displayedData.map(row => {
      row.selected = this.selectedAll;

      return row;
    });
    this._currentValue.selected = this._getSelectedFromOriginal();
    this._changeDetectorRef.markForCheck();
  }

  toggleSelectRow(item: TableRow): void {
    if (!this.selectionTab?.multi) {
      this.clearSelectedItems();
    }
    item.selected = !item.selected;
    this._currentValue.selected = this._getSelectedFromOriginal();

    if (this.selectionTab?.once && !this.selectionTab?.multi) {
      this._success();
    } else {
      this._refreshTristate();
    }
    this._changeDetectorRef.markForCheck();
  }

  removeSelected(item: TableRow): void {
    item.selected = false;
    this._currentValue.selected = this._getSelectedFromOriginal();
    this._refreshTristate();
    this._changeDetectorRef.markForCheck();
  }

  removeExcluded(index: number): void {
    this._currentValue.excluded.splice(index, 1);
    this._changeDetectorRef.markForCheck();
  }

  toggleTab(type: ValueHelpDialogTabs): void {
    if (this.selectedTab === type) {
      this.selectedTab = undefined;
    } else {
      this.selectedTab = type;
    }
  }

  showMoreElements(): void {
    if (this.itemPerPage && this._shownCount !== this.displayedData.length) {
      this._shownCount += this.itemPerPage;
      this._shownCount = Math.min(this._shownCount, this.displayedData.length);
      this.showMore.emit({ shownCount: this._shownCount });
    }
  }

  _success(): void {
    this.activeDialog.close(this._currentValue);
  }

  _dismiss(): void {
    if (this.mobile && this.isOpenAdvanced) {
      this.isOpenAdvanced = false;
    } else {
      this.activeDialog.close(null);
    }
  }

  /** @hidden */
  _trackByTableRowFn(_index: number, item: TableRow & { id: number | string }): number | string | undefined {
    return item && item[this.uniqField] ? item[this.uniqField] : undefined;
  }
  _trackByFilterFn(_index: number, item: VhdFilter): number | string | undefined {
    return item && item.key ? item.key : undefined;
  }

  private _getSelectedFromOriginal() {
    return this._originalData.filter(original => {
      return this.displayedData.some(row => row[this.uniqField] === original[this.uniqField] && row.selected)
    })
  }

  private _initializeFilters(): void {
    if (this.mobile) {
      const hastMobileTableHeaders = !!this._mobileTableHeaders.length;
      this._tableFilters = {
        header: this.displayedFilters.filter(filter => hastMobileTableHeaders ? this._mobileTableHeaders.some((key) => key === filter.key) : true),
        bodyHead: this.displayedFilters.filter(filter => hastMobileTableHeaders ? this._mobileTableHeaders.some((key) => key === filter.key) : false),
        bodyCell: this.displayedFilters.filter(filter => hastMobileTableHeaders ? this._mobileTableHeaders.some((key) => key !== filter.key) : true)
      }
    } else {
      this._tableFilters = {
        header: this.displayedFilters,
        bodyHead: this.displayedFilters,
        bodyCell: this.displayedFilters
      }
    }
  }

  /** @hidden */
  private _refreshTristate(): void {
    if (this._currentValue.selected.length === 0) {
      this.selectedAll = false;
    } else if (this._currentValue.selected.length === this._originalData.length) {
      this.selectedAll = true;
    } else {
      this.selectedAll = null;
    }
    console.log(this.selectedAll);
  }

  /** @hidden */
  private _initializeTab(): void {
    if (this.mobile) {
      this.selectedTab = undefined;
      this.isOpenAdvanced = false;
      this._shownCount = 0;
    } else {
      this.itemPerPage = this.displayedData.length;
      this.selectedTab = this.selectedTab || ValueHelpDialogTabs.selectFromList;
    }

    this.showMoreElements();
  }

  private _listenDialogEvents(): void {
    if (!this.activeDialog) {
      return;
    }
    this.activeDialog.afterClosed
      .pipe(takeUntil(this._destroyed))
      .subscribe(value => {
        if (value) {
          console.log('Close with value: ', value);
          this.valueChange.emit(JSON.parse(JSON.stringify(value)));
        } else {
          console.log(value);
        }

        this._resetState();
      });
  }

  /** @hidden */
  private _resetState(): void {
    this.selectedTab = undefined;
    this._resetSelected()
    this._resetSourceStream();
  }

  /** @hidden */
  private _initializeDS(ds: FdpValueHelpDialogDataSource<any>): void {
    this._originalData = [];
    this._resetSourceStream();
    this._dsSubscription = this._stateService.initializeDS(ds)
      .pipe(takeUntil(this._destroyed))
      .subscribe(data => {
        this._originalData = JSON.parse(JSON.stringify(data)) || [];
        this.refreshDisplayedData();
      });

  }

  /** @hidden */
  private updateOriginalSource(): void {
    this._initializeDS(this.dataSource);
  }

  /** @hidden */
  private checkFilters(filters?: PlatformVhdFilterComponent[]): void {
    this._mobileTableHeaders = this._mobileTableHeaders || [];
    this.displayedFilters = (filters || (this.filters ? this.filters.toArray() : [])).map(filter => {
      if (filter.mobileTableHeader) {
        this._mobileTableHeaders.push(filter.key);
      }
      return {
        key: filter.key,
        label: filter.label || filter.key,
        value: filter.value || '',
        advanced: filter.advanced,
        include: filter.include,
        exclude: filter.exclude
      };
    });
    this.hasAdvanced = this.displayedFilters.some((filter: PlatformVhdFilterComponent) => {
      return !!filter.advanced;
    });
    this.hasInclude = this.displayedFilters.some((filter: PlatformVhdFilterComponent) => {
      return !!filter.include;
    });
    this.hasExclude = this.displayedFilters.some((filter: PlatformVhdFilterComponent) => {
      return !!filter.exclude;
    });
    this._initializeFilters();
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

  /** @hidden */
  private _resetSelected(): void {
    this.clearSelectedItems();
    this.clearExcludedItems();
  }
}

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
  HostBinding
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

export interface VhdFilterChangeEvent {
  filters?: {
    key: string;
    value: string;
  }[];
  tokens?: any
}

export interface VhdValueChangeEvent {
  selected: any;
  excluded: any;
}

let vhiUniqueId = 0;
type FdpValueHelpDialogDataSource<T> = ValueHelpDialogDataSource<T>;
interface TableRow {
  selected: boolean;
}

@Component({
  selector: 'fdp-value-help-dialog',
  templateUrl: './value-help-dialog.component.html',
  styleUrls: ['./value-help-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformValueHelpDialogComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
  /** Id of the popover. If none is provided, one will be generated. */
  @Input()
  id: string = 'fdp-vhd-' + vhiUniqueId++;
  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _dialogService: DialogService
  ) { }
  /** Reference to popover trigger element */
  @Input()
  triggerElement: ElementRef;

  /** Value Help Dialog title */
  @Input()
  dialogTitle: string;

  /** @hidden
   * Selection mode from data table
  */
  @Input()
  multiSelection = false;

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

  /** Initial expand state for advanced search panel */
  @Input()
  get dataSource(): FdpValueHelpDialogDataSource<any> {
    return this._dataSource;
  }
  set dataSource(value: FdpValueHelpDialogDataSource<any>) {
    if (value) {
      this._dataSource = value;
    }
  }

  /** Value help dialog dialog's config */
  @Input()
  dialogConfig: DialogConfig = {};

/** Field name for default render from data */
  @Input()
  tokenViewField = 'name';

/** Tokenizer function for custom token render */
  @Input()
  tokenizerFn: Function;

/** Uniq field from data source */
  @Input()
  uniqField = 'id';

  /** Whether the value help dialog should be view in mobile mode */
  @Input()
  @HostBinding('class.fdp-value-help-dialog-mobile')
  mobile = false;

  /** Event emitted when filters/tokens were changed. */
  @Output()
  filterChange = new EventEmitter<VhdFilterChangeEvent>();

  /** Event emitted when filters/tokens were changed. */
  @Output()
  valueChange = new EventEmitter<VhdValueChangeEvent>();

  /** Internal container for */
  @ContentChildren(PlatformVhdFilterComponent)
  filters: QueryList<PlatformVhdFilterComponent>;

  /** @hidden
   * Internal container for dialog
  */
  @ViewChild('container', { read: TemplateRef })
  container: TemplateRef<any>;


  hasAdvanced = true;
  hasInclude = true;
  hasExclude = true;
  selectedExpandState = true;

  currentValue: VhdValueChangeEvent = {
    selected: [],
    excluded: []
  };

  selectedTab: number;
  displayedFilters: VhdFilter[] = [];
  displayedData: TableRow[] = [];

  selectedAll = false;
  indeterminateData = false;

  activeDialog: DialogRef;
  /**@hidden */
  private _destroyed = new Subject<void>();
  /**@hidden */
  protected _dataSource: FdpValueHelpDialogDataSource<any>;
  /**@hidden */
  protected _originalDataSource: FdpValueHelpDialogDataSource<any>;
  /**@hidden */
  private _originalData = [];
  /**@hidden
  * for data source handling
  */
  private _dsSubscription: Subscription;

  get hasSelectedTab(): boolean {
    return !isNaN(this.selectedTab) && this.selectedTab >= 0;
  }

  get isSelectionTab(): boolean {
    return this.selectedTab === 0;
  }

  get selectedItems(): any {
    return this.currentValue.selected;
  }

  get excludedItems(): any {
    return this.currentValue.excluded;
  }

  get selectionTableMode(): string {
    return Boolean(this.multiSelection) ? 'multiple' : 'single';
  }

  get isOpen(): boolean {
    return !!this.activeDialog
  }

  open(): void {
    this._initializeTab();
    this._initializeDS(this.dataSource);
    this.activeDialog = this._dialogService.open(this.container, {
      backdropClickCloseable: false,
      hasBackdrop: true,
      verticalPadding: false,
      escKeyCloseable: false,
      maxWidth: '75%',
      maxHeight: '730px',
      width: '1230px',
      height: this.mobile ? '75%' : null,
      dialogPanelClass: 'fdp-value-help-dialog',
      ...this.dialogConfig
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
    const selectedCount = this.currentValue.selected.length !== 0;
    const excludedCount = this.currentValue.excluded.length !== 0;

    if (selectedCount || excludedCount) {
      this.selectedExpandState = !this.selectedExpandState;
    }
  }

  toggleAdvancedSearch(): void {
    this.isOpenAdvanced = !this.isOpenAdvanced;
  }

  clearSelectedItems(): void {
    this.currentValue.selected = [];
    this.displayedData = this.displayedData.map(row => {
      row.selected = false;

      return row;
    });
    this.selectedAll = null;
    this._changeDetectorRef.markForCheck();
  }

  clearExcludedItems(): void {
    this.currentValue.excluded = [];
    this._changeDetectorRef.markForCheck();
  }

  onSearch(): void {
    this.applyFilters();
    this.filterChange.emit({
      filters: this.displayedFilters
        .filter(({ value }) => !!value)
        .map(({ key, value }) => {
          return {
            key: key,
            value: value
          }
        })
    });
  }

  applyFilters(): void {
    const nonEmptyFilters = this.displayedFilters.filter(({ value }) => !!value);
    if (nonEmptyFilters.length) {
      const filterFn = (row: any) => {
        return nonEmptyFilters.every(filter => String(row[filter.key]).toLowerCase().includes(filter.value.toLowerCase()))
      };
      this.displayedData = this._originalData.filter(filterFn).map(row => {
        row.selected = this.currentValue.selected.some(({ key }) => key === row[this.uniqField]);

        return row;
      });
    } else {
      this.displayedData = this._originalData.slice();
    }
  }

  toggleAllRows(): void {
    if (this.currentValue.selected.length === this._originalData.length) {
      this.selectedAll = false;
    } else {
      this.selectedAll = true;
    }

    this.displayedData = this.displayedData.map(row => {
      row.selected = this.selectedAll;

      return row;
    });
    this.currentValue.selected = this.displayedData.filter(row => row.selected);
    this._changeDetectorRef.markForCheck();
  }
  toggleSelectRow(item: TableRow): void {
    item.selected = !item.selected;
    this.currentValue.selected = this.displayedData.filter(row => !!row.selected);

    this._refreshTristate();
    this._changeDetectorRef.markForCheck();
  }

  onRowSelectionChange(event: any): void {
    console.log(event);
  }

  removeSelected(item: TableRow): void {
    item.selected = false;
    this.currentValue.selected = this.displayedData.filter(row => !!row.selected);
    this._refreshTristate();
    this._changeDetectorRef.markForCheck();
  }

  removeExcluded(index: number): void {
    this.currentValue.excluded.splice(index, 1);
    this._changeDetectorRef.markForCheck();
  }

  toggleTab(index: number): void {
    if (this.selectedTab === index) {
      this.selectedTab = undefined;
    } else {
      this.selectedTab = index;
    }
  }

  _closeDialog(): void {
    this.activeDialog.close(this.currentValue);
  }

  _dismissDialog(): void {
    this.activeDialog.close(null);
  }

  /** @hidden */
  _trackByTableRowFn(_index: number, item: TableRow & { id: number | string }): number | string | undefined {
    return item && item.id ? item.id : undefined;
  }

  /** @hidden */
  private _refreshTristate(): void {
    if (this.currentValue.selected.length === 0) {
      this.selectedAll = false;
    } else if (this.currentValue.selected.length === this._originalData.length) {
      this.selectedAll = true;
    } else {
      this.selectedAll = null;
    }
  }

  /** @hidden */
  private _initializeTab(): void {
    if (this.mobile) {
      this.selectedTab = undefined;
    } else {
      this.selectedTab = this.selectedTab || 0;
    }
    console.log(this.selectedTab)
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
    this.selectedTab = null;
    this._resetSelected()
    this._resetSourceStream();
  }

  /** @hidden */
  private _initializeDS(ds: FdpValueHelpDialogDataSource<any>): void {
    this._originalData = [];
    this._resetSourceStream();
    this._dataSource = this._openDataStream(ds);
  }

  /** @hidden */
  private _toDataStream(ds: FdpValueHelpDialogDataSource<any>): ValueHelpDialogDataSource<any> {
    if (isDataSource(ds)) {
      return ds as ValueHelpDialogDataSource<any>;
    } else if (Array.isArray(ds)) {
      return new ArrayValueHelpDialogDataSource<any>(ds);
    } else if (isObservable(ds)) {
      return new ObservableValueHelpDialogDataSource<any>(ds);
    }

    return undefined;
  }

  /** @hidden */
  private _openDataStream(ds: FdpValueHelpDialogDataSource<any>): ValueHelpDialogDataSource<any> {
    const initDataSource = this._toDataStream(ds);
    if (initDataSource) {
      this._dsSubscription = initDataSource
        .open()
        .pipe(takeUntil(this._destroyed))
        .subscribe(data => {
          this._originalData = data || [];
          this.applyFilters();
        });
      initDataSource.match();

      return initDataSource;
    }
  }

/** @hidden */
  private updateOriginalSource(): void {
    this._initializeDS(this.dataSource);
  }

/** @hidden */
  private checkFilters(filters?: PlatformVhdFilterComponent[]): void {
    this.displayedFilters = (filters || (this.filters ? this.filters.toArray() : [])).map(filter => ({
      key: filter.key,
      label: filter.label || filter.key,
      value: filter.value || '',
      advanced: filter.advanced,
      include: filter.include,
      exclude: filter.exclude
    }));
    this.hasAdvanced = this.displayedFilters.some((filter: PlatformVhdFilterComponent) => {
      return !!filter.advanced;
    });
    this.hasInclude = this.displayedFilters.some((filter: PlatformVhdFilterComponent) => {
      return !!filter.include;
    });
    this.hasExclude = this.displayedFilters.some((filter: PlatformVhdFilterComponent) => {
      return !!filter.exclude;
    });
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

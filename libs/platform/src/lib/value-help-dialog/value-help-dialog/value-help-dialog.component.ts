import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { isObservable, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { isDataSource } from '@fundamental-ngx/platform/shared';
import {
    ArrayValueHelpDialogDataSource,
    BaseEntity,
    ObservableValueHelpDialogDataSource,
    ValueHelpDialogDataSource,
    VdhTableSelection,
    VhdDefineExcludeStrategy,
    VhdDefineIncludeStrategy,
    VhdFilter,
    VhdTab,
    VhdValue,
    VhdValueChangeEvent
} from '../models';
import { VhdFilterComponent } from '../components/value-help-dialog-filter/value-help-dialog-filter.component';
import { defaultConditionDisplayFn } from '../constans/condition-display.function';
import { cloneDeep } from 'lodash-es';

export type FdpValueHelpDialogDataSource<T> =
    | ValueHelpDialogDataSource<T>
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
export class PlatformValueHelpDialogComponent<T = any> implements OnChanges, OnDestroy {
    /** Id of the popover */
    @Input()
    id: string = 'fdp-vhd-' + vhiUniqueId++;

    /** Initial state of Value help dialog */
    @Input()
    value: VhdValue<T> = {
        selected: [],
        conditions: []
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
    isOpenAdvanced = false;

    /** Data source */
    @Input()
    set dataSource(value: FdpValueHelpDialogDataSource<any> | undefined) {
        if (value) {
            this._dataSource = this.toDataStream(value);
        }
    }
    get dataSource(): FdpValueHelpDialogDataSource<any> | undefined {
        return this._dataSource;
    }

    /** Dialog's custom config */
    @Input()
    dialogConfig: DialogConfig = {};

    /** Unique key from the source field names. Required field. */
    @Input()
    uniqueKey: string;

    /** Id attribute for dialog title */
    @Input()
    headerId: string | null = null;

    /** Field name for default render from data.
     * Required field if tokenizerFn is not exist. */
    @Input()
    tokenViewField: string;

    /** Tokenizer function for custom token render, it has higher prio that `tokenViewField`.
     * Required field if tokenViewField is not exist. */
    @Input()
    tokenizerFn: (item: T) => string;

    /** Whether the value help dialog should be view in mobile mode */
    @Input()
    mobile = false;

    /** It should be able if you use multiple selection */
    @Input()
    formatToken: (value: VhdValueChangeEvent<T>) => void;

    /** Tokenizer function for condition's token render */
    @Input()
    conditionDisplayFn = defaultConditionDisplayFn;

    /**
     * @deprecated use i18n capabilities instead
     * Select from list tab's and Search table settings
     * */
    @Input()
    selectTabTitle: string;

    /** Selection mode for search table */
    @Input()
    searchSelection: VdhTableSelection = 'multi';

    /**
     * @deprecated use i18n capabilities instead
     * Text displayed when table has no items.
     */
    @Input()
    searchTableEmptyMessage: string;

    /** Items per page for pagination below search table */
    @Input()
    searchTablePageSize = 20;

    /** Count of default mobile header from search table */
    @Input()
    searchTableMobileHeaders = 2;

    /** Max shown initial filters on open. Desktop only */
    @Input()
    maxShownInitialFilters = 4;

    /** Loading state */
    @Input()
    loading: boolean | undefined;

    /**
     * @deprecated use i18n capabilities instead
     * Define conditions tab's settings
     */
    @Input()
    defineTabTitle: string;

    /** Custom strategies labels
     * Allowed keys: contains, equalTo, between, startsWith, endsWith, lessThan, lessThanEqual, greaterThan, greaterThanEqual, empty
     */
    @Input()
    defineStrategyLabels: {
        [key in keyof (typeof VhdDefineIncludeStrategy | typeof VhdDefineExcludeStrategy)]?: string;
    } = {
        contains: 'contains',
        equalTo: 'equal to',
        between: 'between',
        startsWith: 'starts with',
        endsWith: 'ends with',
        lessThan: 'less than',
        lessThanEqual: 'less than or equal to',
        greaterThan: 'greater than',
        greaterThanEqual: 'greater than or equal to',
        empty: 'empty',
        not_equalTo: 'not equal to',
        not_empty: 'not empty'
    };

    /** Dialog outputs */
    /** Event emitted when filters/tokens were changed. */
    @Output()
    valueChange = new EventEmitter<VhdValueChangeEvent<T>>();

    /** Event emitted when data loading is started. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataReceived = new EventEmitter<void>();

    /** @hidden Fitlers for search table and defince conditions */
    @ContentChildren(VhdFilterComponent)
    filters: QueryList<VhdFilterComponent>;

    /** @hidden Internal container for dialog */
    @ViewChild('container', { read: TemplateRef })
    dialogContainer: TemplateRef<any>;

    /** @hidden */
    activeDialog?: DialogRef;

    /** @hidden */
    _tabTypes = VhdTab;

    /** @hidden */
    _hasAdvanced = true;

    /** @hidden */
    _hasDefineFilters = true;

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
    private _dataSource: FdpValueHelpDialogDataSource<any> | undefined;

    /** @hidden for data source handling */
    private _dsSubscription: Subscription | null;

    /** @hidden Previous state */
    private _prevState: VhdValue<T> = {
        selected: [],
        conditions: []
    };
    /** @hidden Current data for local manupulation */
    private _currentValue: VhdValue<T> = {
        selected: [],
        conditions: []
    };

    /** @hidden */
    selectedTab: VhdTab | null = null;

    /** @hidden */
    shownFilterCount = Infinity;

    /** @hidden */
    get loadingState(): boolean {
        return this.loading ?? this._internalLoadingState;
    }

    /** @hidden
     * To differentiate between first loading when skeletons be shown and subsequent loadings when busy indicator be shown
     */
    _firstLoadingDone = false;

    /** @hidden */
    private _internalLoadingState = false;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _dialogService: DialogService,
        @Optional() private readonly _rtlService: RtlService
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
        return this.selectedTab != null && this.selectedTab in VhdTab;
    }

    /** @hidden */
    get showSelectionTab(): boolean {
        return this.tabs !== 'define';
    }

    /** @hidden */
    get showDefineTab(): boolean {
        return this.tabs !== 'select';
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
    get conditionItems(): BaseEntity[] {
        return this._currentValue.conditions || [];
    }

    /** @hidden */
    get validConditions(): BaseEntity[] {
        return this._getValidCondition(this.conditionItems);
    }

    /** @hidden */
    get hasSelectedAndConditions(): boolean {
        return Boolean(this.selectedItems.length + this.validConditions.length);
    }

    /** @hidden */
    get isShowAllFilters(): boolean {
        return this.filters.length > this.maxShownInitialFilters && this.shownFilterCount > this.maxShownInitialFilters;
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
        this._onDestroy$.next();
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
            maxWidth: this.mobile ? undefined : '92%',
            width: this.mobile ? undefined : '1080px',
            height: this.mobile ? undefined : '98%'
        });
        this._listenDialogEvents();
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
    clearSelectedAndConditionItems(): void {
        this._currentValue.selected = [];
        this._currentValue.conditions = [];
        this._changeDetectorRef.markForCheck();
    }

    /** Search by only the search term. */
    search(): void {
        this.filter(true);
    }

    /**
     * Search by all filled filters, including the search term.
     */
    filter(onlySearch = false): void {
        const nonEmptyFilters = new Map();

        if (!onlySearch) {
            this._displayedFilters
                .filter(({ value }) => !!value && value.trim().length)
                .forEach((e) => nonEmptyFilters.set(e.key, e.value));
        }

        if (this._mainSearch.length) {
            nonEmptyFilters.set('*', this._mainSearch);
        }
        this.dataSource?.match(nonEmptyFilters);
    }

    /**
     * Apply search from advanced filters view, using when mobile view is active
     */
    searchAdvanced(): void {
        this.filter();
        this.selectedTab = VhdTab.selectFromList;
        this.isOpenAdvanced = false;
    }

    /** Remove item from selected array */
    removeSelected(index: number): void {
        this._currentValue.selected = this.selectedItems.filter((_, i) => i !== index);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove condition item
     */
    removeCondition(index: number): void {
        this._currentValue.conditions = this.conditionItems.filter((_, i) => i !== index);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Switch tab by type
     */
    switchTab(type: VhdTab | null = null): void {
        this.selectedTab = type;
    }

    /**
     * Close dialog with value;
     */
    success(): void {
        if (this.activeDialog) {
            const value: VhdValueChangeEvent = {
                selected: this.selectedItems,
                conditions: this.validConditions
            };
            if (typeof this.formatToken === 'function') {
                this.formatToken(value);
                return this.activeDialog.close(value);
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
    _trackBySelectedFn(_index: number, item: T): number | string {
        return item && item[this.uniqueKey];
    }

    /** @hidden */
    _trackByFilterFn(_index: number, item: VhdFilter): number | string {
        return item && item.key;
    }

    /** @hidden */
    _trackByConditionFn(_index: number, item: BaseEntity): number | string | undefined {
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
    onConditionChange($event: BaseEntity[]): void {
        this._currentValue.conditions = $event;
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    toggleShownFilters(): void {
        this.shownFilterCount =
            this.maxShownInitialFilters === this.shownFilterCount ? Infinity : this.maxShownInitialFilters;
    }

    /** @hidden */
    private _initShownFilters(): void {
        this.shownFilterCount = this.maxShownInitialFilters || Infinity;
    }

    /** @hidden */
    private _getValidCondition(items: BaseEntity[] = []): BaseEntity[] {
        return items.filter((item) => {
            if (
                item.strategy === VhdDefineIncludeStrategy.empty ||
                item.strategy === VhdDefineExcludeStrategy.not_empty
            ) {
                return true;
            }
            if (item.strategy === VhdDefineIncludeStrategy.between) {
                return Boolean(item.value.length && item.valueTo.length);
            }
            if (!item.valid) {
                return false;
            }
            return Boolean(item.value.length);
        });
    }

    /** @hidden */
    private _initializeDS(ds: FdpValueHelpDialogDataSource<any> | undefined = this.dataSource): void {
        this._resetSourceStream();

        if (this.showSelectionTab) {
            this._dsSubscription = new Subscription();

            this._dsSubscription.add(
                ds?.onDataRequested().subscribe(() => {
                    this._internalLoadingState = true;
                    this.onDataRequested.emit();
                })
            );

            this._dsSubscription.add(
                ds?.onDataReceived().subscribe(() => {
                    this._internalLoadingState = false;
                    this._firstLoadingDone = true;
                    this.onDataReceived.emit();
                })
            );

            const dsSub = this.openDataStream()
                .pipe(takeUntil(this._destroyed))
                .subscribe((data) => {
                    this._displayedData = data.slice();
                    this._changeDetectorRef.markForCheck();
                });

            this._dsSubscription.add(dsSub);
        }
    }

    /** @hidden Save previous state */
    private _savePreviousState(): void {
        const value = cloneDeep(this.value);
        this._currentValue = value;
        this._prevState = value;
    }

    /** @hidden */
    private _initializeTab(): void {
        if (this.mobile) {
            this.isOpenAdvanced = false;
        }
        if (this.showSelectionTab && this.showDefineTab) {
            this.switchTab(this.mobile ? undefined : this.initialTab);
        } else if (this.showSelectionTab) {
            this.switchTab(VhdTab.selectFromList);
        } else if (this.showDefineTab) {
            this.switchTab(VhdTab.defineConditions);
        }
        this._initShownFilters();
    }

    /** @hidden */
    private _listenDialogEvents(): void {
        if (!this.activeDialog) {
            return;
        }
        this.activeDialog.afterClosed.pipe(takeUntil(this._destroyed)).subscribe((value) => {
            if (value) {
                this.value = value;
                this.valueChange.emit(value);
            }

            this._resetState();
        });
        this.filters.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._updateFilters();
        });

        if (this._rtlService) {
            this._dir = this._rtlService.rtl.getValue() ? 'rtl' : 'ltr';
            this._rtlService.rtl.pipe(takeUntil(this._destroyed)).subscribe((isRtl: boolean) => {
                this._dir = isRtl ? 'rtl' : 'ltr';
            });
        }
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
        this._displayedFilters = this.filters.map((e) => ({
            ...e,
            label: e.label || e.key
        }));

        this._hasAdvanced = this._displayedFilters.some((e: VhdFilter) => !!e.advanced);
    }

    /** @hidden */
    private openDataStream(): Observable<T[]> {
        if (this._dataSource) {
            this._dataSource.match();

            return this._dataSource.open();
        }
        throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
    }

    /** @hidden */
    private toDataStream(ds: FdpValueHelpDialogDataSource<T>): FdpValueHelpDialogDataSource<T> | undefined {
        if (isDataSource(ds)) {
            return ds as ValueHelpDialogDataSource<T>;
        } else if (Array.isArray(ds)) {
            return new ArrayValueHelpDialogDataSource<T>(ds);
        } else if (isObservable(ds)) {
            return new ObservableValueHelpDialogDataSource<T>(ds as Observable<T[]>);
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

    /** @hidden */
    private isValidOptions(): boolean {
        if (this.showSelectionTab) {
            return (
                !!this.dataSource &&
                typeof this.uniqueKey === 'string' &&
                (typeof this.tokenViewField === 'string' || typeof this.tokenizerFn === 'function')
            );
        }
        return true;
    }
}

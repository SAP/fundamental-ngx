import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
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
    ViewEncapsulation,
    computed,
    inject,
    input
} from '@angular/core';
import { Observable, Subject, Subscription, filter, isObservable, of, take, tap } from 'rxjs';

import { Direction } from '@angular/cdk/bidi';
import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DisplayFnPipe, RtlService, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogConfig,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef,
    DialogService
} from '@fundamental-ngx/core/dialog';
import { FormControlComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { LayoutGridColDirective, LayoutGridComponent, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';
import { ListIconDirective, ListLinkDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { HeadingLevel } from '@fundamental-ngx/core/shared';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { TabItemDirective, TabLinkDirective, TabNavComponent, TabTagDirective } from '@fundamental-ngx/core/tabs';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { TokenComponent, TokenizerComponent, TokenizerInputDirective } from '@fundamental-ngx/core/token';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SearchFieldComponent } from '@fundamental-ngx/platform/search-field';
import { isDataSource } from '@fundamental-ngx/platform/shared';
import { DefineTabComponent } from '../components/define-tab/define-tab.component';
import { SelectTabComponent } from '../components/select-tab/select-tab.component';
import { VhdFilterComponent } from '../components/value-help-dialog-filter/value-help-dialog-filter.component';
import { defaultConditionDisplayFn } from '../constans/condition-display.function';
import { ValueHelpColumnDefDirective } from '../directives/value-help-column-def.directive';
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
import { VhdComponent } from '../models/vhd-component.model';

let vhdHeaderUniqueId = 0;

export type FdpValueHelpDialogDataSource<T> =
    | ValueHelpDialogDataSource<T>
    | ArrayValueHelpDialogDataSource<T>
    | ObservableValueHelpDialogDataSource<T>;

let vhiUniqueId = 0;

@Component({
    selector: 'fdp-value-help-dialog',
    templateUrl: './value-help-dialog.component.html',
    styleUrl: './value-help-dialog.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: VhdComponent,
            useExisting: PlatformValueHelpDialogComponent
        }
    ],
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        NgTemplateOutlet,
        ScrollbarDirective,
        DialogBodyComponent,
        DialogFooterComponent,
        TitleComponent,
        TokenizerComponent,
        TokenComponent,
        ToolbarItemDirective,
        FormControlComponent,
        TokenizerInputDirective,
        ButtonComponent,
        FormsModule,
        LayoutGridComponent,
        LayoutGridRowDirective,
        LayoutGridColDirective,
        SearchFieldComponent,
        ToolbarComponent,
        ToolbarSpacerDirective,
        BusyIndicatorComponent,
        FormLabelComponent,
        SkeletonComponent,
        SelectTabComponent,
        DefineTabComponent,
        ListLinkDirective,
        ListTitleDirective,
        ListIconDirective,
        TabNavComponent,
        TabItemDirective,
        TabLinkDirective,
        TabTagDirective,
        BarComponent,
        BarLeftDirective,
        BarElementDirective,
        BarRightDirective,
        ButtonBarComponent,
        SlicePipe,
        FdTranslatePipe,
        DisplayFnPipe
    ]
})
export class PlatformValueHelpDialogComponent<T = any> extends VhdComponent implements OnChanges, OnDestroy {
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
    headerId = `fdp-vhd-header-id-${vhdHeaderUniqueId++}`;

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

    /** Validator function. Called when user submits VHD dialog. */
    @Input()
    tokenValidator: ((value: VhdValueChangeEvent) => Observable<boolean> | boolean) | undefined;

    /** Selection mode for search table */
    @Input()
    searchSelection: VdhTableSelection = 'multi';

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

    /** Whether to allow users to select all table entries with one checkbox. */
    @Input()
    allowSelectAll = true;

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

    /** Column definitions. */
    @ContentChildren(ValueHelpColumnDefDirective)
    columnDef: QueryList<ValueHelpColumnDefDirective>;

    /** @hidden Internal container for dialog */
    @ViewChild('container', { read: TemplateRef })
    dialogContainer: TemplateRef<any>;

    /**
     * Heading level of the dialog title.
     */
    headingLevel = input<HeadingLevel>(5);

    /** @hidden */
    _headingLevel = computed(() =>
        this.headingLevel() ? Number.parseInt(`${this.headingLevel()}`.replace(/\D/g, ''), 10) : undefined
    );

    /** @hidden */
    activeDialog?: DialogRef;

    /** @hidden */
    _tabTypes = VhdTab;

    /** @hidden */
    _hasAdvanced = true;

    /** @hidden */
    _displayedFilters: VhdFilter[] = [];

    /** @hidden */
    _displayedData: T[] = [];

    /** @hidden */
    _mainSearch = '';

    /** handles rtl service
     * @hidden */
    _dir$ = computed<Direction>(() => (this._rtlService?.rtlSignal() ? 'rtl' : 'ltr'));

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
    private _destroyed = inject(DestroyRef);

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
        super();
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
        if (!this.dialogConfig.ariaLabelledBy) {
            this.dialogConfig.ariaLabelledBy = this.headerId;
        }
        this.activeDialog = this._dialogService.open(this.dialogContainer, {
            backdropClickCloseable: false,
            hasBackdrop: true,
            verticalPadding: false,
            escKeyCloseable: false,
            dialogPanelClass: `fdp-value-help-dialog ${this.mobile ? 'fdp-value-help-dialog-mobile' : ''}`,
            ...this.dialogConfig,

            mobile: this.mobile,
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
                .filter(({ value }) =>
                    !!value && typeof value === 'string' ? value.trim().length : value !== undefined
                )
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
        if (!this.activeDialog) {
            return;
        }
        const value: VhdValueChangeEvent = {
            selected: this.selectedItems,
            conditions: this.validConditions
        };

        this._internalLoadingState = true;
        this._changeDetectorRef.detectChanges();
        this._getValidatorFunction(value)
            .pipe(
                tap(() => {
                    this._internalLoadingState = false;
                    this._changeDetectorRef.detectChanges();
                }),
                filter((r) => r),
                take(1),
                takeUntilDestroyed(this._destroyed)
            )
            .subscribe(() => {
                if (typeof this.formatToken === 'function') {
                    this.formatToken(value);
                }
                this.activeDialog?.close(value);
            });
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
    _trackBySelectedFn: (_index: number, item: T) => number | string = (_index: number, item: T) =>
        item && item[this.uniqueKey];

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
                .pipe(takeUntilDestroyed(this._destroyed))
                .subscribe((data) => {
                    this._displayedData = data.slice();
                    this._changeDetectorRef.markForCheck();
                });

            this._dsSubscription.add(dsSub);
        }
    }

    /** @hidden Save previous state */
    private _savePreviousState(): void {
        const value = structuredClone(this.value);
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
        this.activeDialog.afterClosed.pipe(takeUntilDestroyed(this._destroyed)).subscribe((value) => {
            if (value) {
                this.value = value;
                this.valueChange.emit(value);
            }

            this._resetState();
        });
        this.filters.changes.pipe(takeUntilDestroyed(this._destroyed)).subscribe(() => {
            this._updateFilters();
        });
    }

    /** @hidden */
    private _resetState(): void {
        this._resetSourceStream();
        this._mainSearch = '';
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

    private _getValidatorFunction(value: VhdValueChangeEvent): Observable<boolean> {
        const validator = typeof this.tokenValidator === 'function' ? this.tokenValidator(value) : of(true);

        return isObservable(validator) ? validator : of(validator);
    }
}

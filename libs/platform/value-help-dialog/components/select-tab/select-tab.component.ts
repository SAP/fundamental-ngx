/* eslint-disable @typescript-eslint/member-ordering */
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { FocusableGridDirective, range } from '@fundamental-ngx/cdk/utils';
import { BarComponent, BarElementDirective, BarMiddleDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { InfiniteScrollDirective } from '@fundamental-ngx/core/infinite-scroll';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import {
    TableBodyDirective,
    TableCellDirective,
    TableComponent,
    TableHeaderDirective,
    TableRowDirective,
    TableTextDirective
} from '@fundamental-ngx/core/table';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { startWith } from 'rxjs';
import { ValueHelpColumnDefDirective } from '../../directives/value-help-column-def.directive';
import { VdhTableSelection, VhdFilter } from '../../models';
import { VhdComponent } from '../../models/vhd-component.model';
import { VhdBaseTab } from '../base-tab/vhd-base-tab.component';

let titleUniqueId = 0;

@Component({
    selector: 'fdp-select-tab',
    templateUrl: './select-tab.component.html',
    styleUrl: './select-tab.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        InfiniteScrollDirective,
        FocusableGridDirective,
        TableComponent,
        FormLabelComponent,
        TableHeaderDirective,
        TableRowDirective,
        TableCellDirective,
        CheckboxComponent,
        FormsModule,
        TableBodyDirective,
        TableTextDirective,
        BarComponent,
        BarMiddleDirective,
        BarElementDirective,
        ButtonComponent,
        SkeletonComponent,
        SlicePipe,
        FdTranslatePipe,
        NgTemplateOutlet
    ]
})
export class SelectTabComponent<T> extends VhdBaseTab implements OnChanges, AfterViewInit {
    /** @hidden */
    readonly loadingRange = range(3);
    protected defaultTitleId = `fd-select-tab-title-id-${titleUniqueId++}`;
    /** @hidden */
    protected defaultCountId = `fd-select-tab-title-count-id-${titleUniqueId++}`;

    /** Select tab title element ID */
    @Input()
    selectTabTitleId: string = this.defaultTitleId;

    /** Select tab count element ID */
    @Input()
    selectTabCountId: string = this.defaultCountId;

    /** Selected items */
    @Input()
    selected: T[] = [];

    /** Loading state */
    @Input()
    loading = false;

    /** Actual filters */
    @Input()
    filters: VhdFilter[] = [];

    /** Close dialog immediately after select any row from search table. It'll be skipped if multi option is true */
    @Input()
    selection: VdhTableSelection = 'single';

    /** Whether to allow users to select all table entries with one checkbox. */
    @Input()
    allowSelectAll = true;

    /** Uniq field from data source */
    @Input()
    uniqueKey = 'id';

    /** Items per page for pagination below search table */
    @Input()
    pageSize: number;

    /** Count of default mobile header from search table */
    @Input()
    defaultMobileHeaders = 2;

    /** Displayed data for search table */
    @Input()
    displayedData: T[] = [];

    /** Event emitted when row was selected. */
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() select = new EventEmitter<T[]>();

    /** @hidden */
    @ViewChild(InfiniteScrollDirective) infiniteScrollTable: InfiniteScrollDirective;

    /** @hidden indeterminate flag for `select all` checkbox */
    _selectedAll: boolean | null = false;

    /** @hidden Shown items count in mobile view */
    _shownFrom = 0;

    /** @hidden Shown items count in mobile view */
    _shownCount = 0;

    /** @hidden Current page in desktop view */
    _currentPage = 0;

    /** @hidden Headers and body for search table */
    _tableFilters: {
        main: VhdFilter[];
        secondary: VhdFilter[];
    } = {
        main: [],
        secondary: []
    };

    /** @hidden */
    _selectedMap: { [key: string]: boolean } = {};

    /** Selection type getters */
    get isSingleSelection(): boolean {
        return this.selection === 'single';
    }
    /** Selection type getters */
    get isOnceSelection(): boolean {
        return this.selection === 'once';
    }
    /** Selection type getters */
    get isMultiSelection(): boolean {
        return this.selection === 'multi';
    }

    /** @hidden */
    _columnDefMap = new Map<string, ValueHelpColumnDefDirective>();

    /** @hidden */
    private selectedItems: T[] = [];

    /** @hidden */
    private readonly _vhd = inject(VhdComponent, { optional: true });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    ngAfterViewInit(): void {
        Promise.resolve(true).then(() => this._checkScrollAndShowMore());

        this._vhd?.columnDef.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._columnDefMap.clear();
            this._vhd?.columnDef.forEach((item) => {
                this._columnDefMap.set(item.column, item);
            });
        });
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
    _trackByTableRowFn: (_index: number, item: T) => string | undefined = (_index: number, item: T) => {
        if (item) {
            return item[this.uniqueKey];
        }

        return undefined;
    };

    /** @hidden Track function for filters */
    _trackByFilterFn(_index: number, item: VhdFilter): number | string | undefined {
        return item && item.key ? item.key : undefined;
    }

    /** @hidden Show more elements */
    _showMoreElements(): void {
        if (this.pageSize && this._shownCount !== this.displayedData.length) {
            this._shownCount += this.pageSize;
            this._shownCount = Math.min(this._shownCount, this.displayedData.length);
        } else {
            this._shownCount = this.displayedData.length;
        }
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden Refresh page in desktop view */
    _updatePage(pageNumber = 1): void {
        if (this.pageSize) {
            this._currentPage = pageNumber;
            this._shownFrom = (pageNumber - 1) * this.pageSize;
            this._shownCount = Math.min(this._shownFrom + this.pageSize, this.displayedData.length);
        } else {
            this._shownCount = this.displayedData.length;
        }
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
    private _checkScrollAndShowMore(): void {
        if (this.mobile) {
            return;
        }
        if (
            this.displayedData.length &&
            this._shownCount !== this.displayedData.length &&
            this.infiniteScrollTable?.shouldTriggerAction()
        ) {
            this._showMoreElements();
            setTimeout(() => {
                this._checkScrollAndShowMore();
            }, 100);
        }
    }

    /** @hidden */
    private _resetShown(): void {
        if (this.mobile) {
            this._showMoreElements();
        } else {
            this._checkScrollAndShowMore();
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
            let _mobileTableHeaders = this.filters.filter((f) => f.main).map((f) => f.key);
            if (!_mobileTableHeaders.length) {
                _mobileTableHeaders = this.filters.slice(0, this.defaultMobileHeaders).map((f) => f.key);
            }
            this._tableFilters = {
                main: this.filters.filter((filter) => _mobileTableHeaders.some((key) => key === filter.key)),
                secondary: this.filters.filter((filter) => !_mobileTableHeaders.some((key) => key === filter.key))
            };
        } else {
            this._tableFilters = {
                main: this.filters,
                secondary: []
            };
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

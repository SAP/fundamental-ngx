import { LiveAnnouncer } from '@angular/cdk/a11y';
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';

import { ContentDensityService, RtlService } from '@fundamental-ngx/core/utils';

import { Pagination } from './pagination.model';
import { PaginationService } from './pagination.service';

/** Constant representing the default number of items per page. */
const DEFAULT_ITEMS_PER_PAGE = 10;

interface CurrentShowing {
    from: number;
    to: number;
    of: number;
}

let paginationUniqueId = 0;

/**
 * The component that is used to provide navigation between paged information.
 * ```html
 * <fd-pagination
 *          [totalItems]="50"
 *          [itemsPerPage]="10"
 *          [currentPage]="3">
 * </fd-pagination>
 * ```
 */
@Component({
    selector: 'fd-pagination',
    templateUrl: './pagination.component.html',
    providers: [PaginationService],
    host: {
        class: 'fd-pagination',
        '[class.fd-pagination--mobile]': 'mobile'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: true
})
export class PaginationComponent implements OnChanges, OnInit, OnDestroy {
    /** Id for the pagination component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-pagination-' + paginationUniqueId++;

    /** Whether component should be shown in compact mode. True by default. Cozy mode is generally applied for tablets, mobile. */
    @Input()
    compact = true;

    /** Whether component should be shown in the mobile mode. */
    @Input()
    set mobile(value: boolean) {
        this._mobile = coerceBooleanProperty(value);
    }
    get mobile(): boolean {
        return this._mobile;
    }

    /** Represents the total number of items. */
    @Input()
    totalItems: number;

    /** Represents the current page number. */
    @Input()
    get currentPage(): number {
        return this._currentPage;
    }
    set currentPage(value: number) {
        this._currentPage = Math.floor(coerceNumberProperty(value, 1));
    }

    /** Represents the number of items per page. */
    @Input()
    get itemsPerPage(): number {
        return this._itemsPerPage;
    }
    set itemsPerPage(value: number) {
        value = Math.floor(coerceNumberProperty(value, DEFAULT_ITEMS_PER_PAGE));
        this._itemsPerPage = Math.min(value, this.totalItems);
    }

    /**
     * The custom template show range of item by current page of items.
     * It has higher priority than `itemsPerPageOptions` property.
     */
    @Input()
    itemsPerPageTemplate: TemplateRef<any>;

    /**
     * Label for options for items per page.
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    itemsPerPageLabel = 'Results per page';

    /** Represents the options for items per page. */
    @Input()
    get itemsPerPageOptions(): number[] {
        return this._itemsPerPageOptions;
    }
    set itemsPerPageOptions(value: number[]) {
        this._itemsPerPageOptions = coerceArray<number>(value)
            .map((v) => coerceNumberProperty(v, 0))
            .map((v) => Math.floor(v))
            .filter((v) => v > 0 && v < this.totalItems)
            .sort((a, b) => a - b);

        if (this._itemsPerPageOptions.some((v) => v !== this.itemsPerPage)) {
            this.itemsPerPage = this._itemsPerPageOptions[0];
        }
    }

    /** Whether to display the total number of items. */
    @Input()
    displayTotalItems = true;

    /**
     * The template show range of item by current page of items.
     * Default view: Showing {{ from }}-{{ to }} of {{ of }}
     */
    @Input()
    displayTextTemplate: TemplateRef<any>;

    /**
     * Label for the 'first' page button.
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    firstLabel = 'First';

    /**
     * Label for the 'previous' page button.
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    previousLabel = 'Previous';

    /**
     * Label for the 'next' page button.
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    nextLabel = 'Next';

    /**
     * Label for the 'last' page button.
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    lastLabel = 'Last';

    /**
     * Label for the 'Page' page button.
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    pageLabel = 'Page';

    /**
     * Aria label for the navigation element
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    ariaLabel = 'Pagination';

    /**
     * The current page label that should be read when a page is selected.
     * Please use ${currentPage} in the value for replacing with the current page number.
     * Example: `Page ${currentPage} is selected`.
     * This property is mainly provided to support reading in the right language for screen reader.
     */
    @Input()
    currentPageAriaLabel = 'Page ${currentPage} is current page';

    /** Event fired when the page is changed. */
    @Output()
    pageChangeStart = new EventEmitter<number>();

    /** @hidden */
    _pages: number[] = [];

    /** @hidden */
    get _selectId(): string {
        return this.id + '-select';
    }

    /**
     * Retrieves an object that represents
     * the total number of items, the current page, and the number of items per page.
     */
    get paginationObject(): Pagination {
        return {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPerPage
        };
    }

    /** @hidden */
    get _lastPage(): number {
        return this.paginationService.getTotalPages(this.paginationObject);
    }

    /** @hidden */
    get isFirstPage(): boolean {
        return this.currentPage === 1;
    }

    /** @hidden */
    get isLastPage(): boolean {
        return this.currentPage === this.paginationService.getTotalPages(this.paginationObject);
    }

    /** @hidden */
    get _currentPageAriaLabel(): string {
        return this.currentPageAriaLabel.replace(/\${currentPage}/, this.currentPage.toString());
    }

    /** @hidden */
    get _totalPagesElementId(): string {
        return this.id + '__total';
    }

    /** @hidden */
    _currentShowing: CurrentShowing = {
        from: 0,
        to: 0,
        of: 0
    };

    /** @hidden */
    private _itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;

    /** @hidden */
    private _mobile = false;

    /** @hidden */
    private _itemsPerPageOptions: number[];

    /** @hidden */
    private _currentPage = 1;

    /** @hidden */
    private _initialItemsPerPage: number;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private get _isRtl(): boolean {
        return this._rtlService?.rtl.value;
    }

    /** @hidden */
    constructor(
        private readonly paginationService: PaginationService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _liveAnnouncer: LiveAnnouncer,
        @Optional() private readonly _rtlService: RtlService,
        @Optional() private readonly _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.itemsPerPage) {
            this._initialItemsPerPage = changes.itemsPerPage.currentValue;
        }

        if (changes && changes.totalItems && this._initialItemsPerPage) {
            this.itemsPerPage = this._initialItemsPerPage;
        }

        if (changes && changes.currentPage) {
            this.currentPage = changes.currentPage.currentValue;
        }

        if (!this.currentPage || this.currentPage < 1) {
            this.currentPage = 1;
        } else {
            const totalPages = this.paginationService.getTotalPages(this.paginationObject);

            if (this.currentPage > totalPages) {
                this.currentPage = totalPages;
            }
        }

        this._refreshPages();
    }

    /** @hidden */
    ngOnInit(): void {
        this._subscriptions.add(this._rtlService?.rtl.subscribe(() => this._refreshPages()));

        this._subscriptions.add(
            this._contentDensityService?._contentDensityListener.subscribe((density) => {
                this.compact = density !== 'cozy';
                this._cdr.markForCheck();
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * Navigates to a specific page.
     * @param page The number of the page to navigate to.
     * @param $event The mouse event (optional).
     */
    goToPage(page: number, $event?: Event): void {
        if ($event) {
            $event.preventDefault();
        }

        if (page > this.paginationService.getTotalPages(this.paginationObject) || page < 1) {
            return;
        }

        this._refreshPages();

        this.pageChangeStart.emit(page);

        this._liveAnnouncer.announce(this._currentPageAriaLabel);
    }

    /** Navigates to the first page */
    goToFirstPage(): void {
        this.goToPage(this._pages[0]);
    }

    /**
     * Navigates to a previous page.
     */
    previousPage(): void {
        this.goToPage(this.currentPage - 1);
    }

    /**
     * Navigates to a next page.
     */
    nextPage(): void {
        this.goToPage(this.currentPage + 1);
    }

    /** Navigates to the last page */
    goToLastPage(): void {
        this.goToPage(this._lastPage);
    }

    /** @deprecated, use {@link paginationObject} getter instead */
    getPaginationObject(): Pagination {
        return this.paginationObject;
    }

    /** @hidden */
    _onChangePerPage = (event: number): void => {
        this.itemsPerPage = event;
        this._refreshPages();

        const maxPage = this._pages[this._pages.length - 1];
        if (this.currentPage > maxPage) {
            this.pageChangeStart.emit(maxPage);
        }
    };

    /** @hidden */
    _restoreInputValue(model: NgModel): void {
        model.reset(this.currentPage);
        this._cdr.markForCheck();
    }

    /** @hidden */
    private _refreshPages(): void {
        const pagination = this.paginationObject;
        const pages = this.paginationService.getPages(pagination);

        this._pages = this._isRtl ? pages.slice().reverse() : pages;
        this._currentShowing = {
            from: this.currentPage - 1 === 0 ? 1 : (this.currentPage - 1) * pagination.itemsPerPage + 1,
            to: Math.min((this.currentPage - 1) * pagination.itemsPerPage + pagination.itemsPerPage, this.totalItems),
            of: this.totalItems
        };

        this._cdr.markForCheck();
    }
}

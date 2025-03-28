import { FocusableOption, LiveAnnouncer } from '@angular/cdk/a11y';
import { coerceArray, coerceNumberProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    booleanAttribute
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, Subscription, firstValueFrom } from 'rxjs';

import { FocusKeyManagerItemDirective, FocusKeyManagerListDirective, RtlService } from '@fundamental-ngx/cdk/utils';

import { NgTemplateOutlet } from '@angular/common';
import { OnlyDigitsDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormControlComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { FD_LANGUAGE, FdLanguage, FdTranslatePipe, TranslationResolver } from '@fundamental-ngx/i18n';
import { Pagination } from './pagination.model';
import { PaginationService } from './pagination.service';

/** Constant representing the default number of items per page. */
const DEFAULT_ITEMS_PER_PAGE = 10;

interface CurrentShowing {
    from: number;
    to: number;
    totalCount: number;
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
    providers: [PaginationService, contentDensityObserverProviders()],
    host: {
        class: 'fd-pagination',
        '[class.fd-pagination--mobile]': 'mobile',
        '[class.fd-pagination--short]': '_lastPage <= 9'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: true,
    imports: [
        NgTemplateOutlet,
        FocusKeyManagerListDirective,
        ButtonComponent,
        FocusKeyManagerItemDirective,
        FormLabelComponent,
        FormsModule,
        FormControlComponent,
        OnlyDigitsDirective,
        SelectComponent,
        OptionComponent,
        FdTranslatePipe
    ]
})
export class PaginationComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    /** @hidden */
    @ViewChild(FocusKeyManagerListDirective)
    readonly _focusKeyManagerList: FocusKeyManagerListDirective;

    /** @hidden */
    @ViewChildren(FocusKeyManagerItemDirective)
    readonly _focusKeyManagerItems: QueryList<FocusKeyManagerItemDirective>;

    /** @hidden */
    @ViewChild('pageInputElement', { read: ElementRef })
    readonly _pageInputElement: ElementRef;

    /** @hidden */
    @ViewChild('currentPageElement', { read: ElementRef })
    readonly _currentPageElement: ElementRef;

    /** Id for the pagination component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-pagination-' + paginationUniqueId++;

    /** Whether component should be shown in the mobile mode. */
    @Input({ transform: booleanAttribute })
    mobile = false;

    /** Represents the total number of items. */
    @Input()
    totalItems: number;

    /** Represents the current page number. */
    @Input()
    set currentPage(value: number) {
        this._currentPage = Math.floor(coerceNumberProperty(value, 1));
    }
    get currentPage(): number {
        return this._currentPage;
    }

    /** Represents the number of items per page. */
    @Input()
    set itemsPerPage(value: number) {
        value = Math.floor(coerceNumberProperty(value, DEFAULT_ITEMS_PER_PAGE));

        this._itemsPerPage = Math.max(value, 1);

        this._updateDisplayedPageSizeOptions();
    }
    get itemsPerPage(): number {
        return this._itemsPerPage;
    }

    /**
     * The custom template show range of item by current page of items.
     * It has higher priority than `itemsPerPageOptions` property.
     */
    @Input()
    itemsPerPageTemplate: TemplateRef<any>;

    /** Represents the options for items per page. */
    @Input()
    set itemsPerPageOptions(value: number[]) {
        this._itemsPerPageOptions = coerceArray<number>(value)
            .map((v) => coerceNumberProperty(v, 0))
            .map((v) => Math.floor(v))
            .filter((v) => v > 0)
            .sort((a, b) => a - b);

        this._updateDisplayedPageSizeOptions();
    }
    get itemsPerPageOptions(): number[] {
        return this._itemsPerPageOptions;
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

    /** Event emitted when the page is changed. */
    @Output()
    pageChangeStart = new EventEmitter<number>();

    /** Event emitted when items per page option is changed.*/
    @Output()
    itemsPerPageChange = new EventEmitter<number>();

    /** @hidden */
    _pages: number[] = [];

    /** @hidden */
    _pagesBeforeCurrent: number[];

    /** @hidden */
    _pagesAfterCurrent: number[];

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
    get _totalPages(): number {
        return this.paginationService.getTotalPages(this.paginationObject);
    }

    /** @hidden */
    get _totalPagesElementId(): string {
        return this.id + '__total';
    }

    /** @hidden */
    get _moreElementValue(): number {
        return this.paginationService.moreElementValue;
    }

    /** @hidden */
    _currentShowing: CurrentShowing = {
        from: 0,
        to: 0,
        totalCount: 0
    };

    /** @hidden */
    _displayedPageSizeOptions: number[] = [];

    /** @hidden */
    private _itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;

    /** @hidden */
    private _itemsPerPageOptions: number[] = [];

    /** @hidden */
    private _currentPage = 1;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        private readonly paginationService: PaginationService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _liveAnnouncer: LiveAnnouncer,
        @Inject(FD_LANGUAGE) private readonly _language: Observable<FdLanguage>,
        @Optional() private readonly _rtlService: RtlService,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.currentPage) {
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
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._focusKeyManagerList?.focusKeyManager?.withVerticalOrientation(false);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    skipItemPredicate(item: ElementRef & FocusableOption): boolean {
        return (
            getComputedStyle(item.nativeElement).display === 'none' ||
            item.nativeElement.getAttribute('disabled') === 'true'
        );
    }

    /**
     * Navigates to a specific page.
     * @param page The page to navigate to.
     * @param event The mouse event (optional).
     */
    goToPage(page: number, event?: Event): void {
        if (page > this._lastPage || page < 1) {
            return;
        }

        this._refreshPages();

        if (event) {
            this._focusCurrentPage();
        }

        this.pageChangeStart.emit(page);

        this._announcePage(page);
    }

    /** Navigates to the first page */
    goToFirstPage(): void {
        this.goToPage(1);
    }

    /**
     * Navigates to a previous page.
     */
    previousPage(): void {
        this.goToPage(this.currentPage - 1);
    }

    /**
     * Navigates to the next page.
     */
    nextPage(): void {
        this.goToPage(this.currentPage + 1);
    }

    /** Navigates to the last page */
    goToLastPage(): void {
        this.goToPage(this._lastPage);
    }

    /** @hidden */
    _onChangePerPage = (event: number): void => {
        this.itemsPerPage = event;
        this.itemsPerPageChange.emit(this.itemsPerPage);

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

        this._pages = this.paginationService.getPages(pagination);

        const currentPageIndex = this._pages.findIndex((page) => page === this.currentPage);

        this._pagesBeforeCurrent = this._pages.slice(0, currentPageIndex);
        this._pagesAfterCurrent = this._pages.slice(currentPageIndex + 1);

        const itemsPerPage = pagination.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE;

        this._currentShowing = {
            from: this.currentPage - 1 === 0 ? 1 : (this.currentPage - 1) * itemsPerPage + 1,
            to: Math.min((this.currentPage - 1) * itemsPerPage + itemsPerPage, this.totalItems),
            totalCount: this.totalItems
        };

        this._cdr.markForCheck();
    }

    /** Focus current page link/input using FocusKeyManager
     * @hidden
     */
    private _focusCurrentPage(): void {
        const currentPageNativeElement =
            getComputedStyle(this._currentPageElement.nativeElement).display === 'none'
                ? this._pageInputElement.nativeElement
                : this._currentPageElement.nativeElement;

        const index = this._focusKeyManagerItems
            .toArray()
            .findIndex((elem) => elem.nativeElement === currentPageNativeElement);

        this._focusKeyManagerList.focusItem(index);
    }

    /**
     * Updates the list of page size options to display to the user. Includes making sure that
     * the page size is an option and that the list is sorted.
     */
    private _updateDisplayedPageSizeOptions(): void {
        // If no page size is provided, use the first page size option or the default page size.
        if (!this.itemsPerPage) {
            this._itemsPerPage = this.itemsPerPageOptions.length ? this.itemsPerPageOptions[0] : DEFAULT_ITEMS_PER_PAGE;
        }

        this._displayedPageSizeOptions = this.itemsPerPageOptions?.slice() ?? [];

        if (!this._displayedPageSizeOptions.includes(this.itemsPerPage)) {
            this._displayedPageSizeOptions.push(this.itemsPerPage);
        }

        this._displayedPageSizeOptions.sort((a, b) => a - b);
        this._cdr.markForCheck();
    }

    /** @hidden */
    private async _announcePage(page: number): Promise<void> {
        await this._liveAnnouncer.announce(
            this._translationResolver.resolve(
                await firstValueFrom(this._language),
                'corePagination.currentPageAriaLabel',
                {
                    pageNumber: page,
                    totalCount: this.totalItems
                }
            )
        );
    }
}

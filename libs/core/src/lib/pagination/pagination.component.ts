import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    ViewEncapsulation,
    TemplateRef, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {
    ENTER,
    SPACE
} from '@angular/cdk/keycodes';
import { coerceNumberProperty, coerceArray } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs';

import { KeyUtil } from '@fundamental-ngx/core/utils';
import { PaginationService } from './pagination.service';
import { RtlService } from '@fundamental-ngx/core/utils';
import { Pagination } from './pagination.model';

/** Constant representing the default number of items per page. */
const DEFAULT_ITEMS_PER_PAGE = 10;
interface CurrentShowing {
    from: number;
    to: number;
    of: number;
};

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
        class: 'fd-pagination'
    },
    styles: [
        `
            .fd-pagination a {
                cursor: pointer;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: true
})
export class PaginationComponent implements OnChanges, OnInit, OnDestroy {
    /** Id for the pagination component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-pagination-' + paginationUniqueId++;

    /** Represents the total number of items. */
    @Input()
    totalItems: number;

    /** Represents the current page number. */
    @Input()
    get currentPage(): number {
        return this._currentPage;
    };
    set currentPage(value: number) {
        this._currentPage = coerceNumberProperty(value, 1);
    };

    /** Represents the number of items per page. */
    @Input()
    get itemsPerPage(): number {
        return this._itemsPerPage;
    }
    set itemsPerPage(value: number) {
        this._itemsPerPage = Math.min(coerceNumberProperty(value, DEFAULT_ITEMS_PER_PAGE), this.totalItems);
    }

    /**
     * The custom template show range of item by current page of items.
     * It has higher priority than `itemsPerPageOptions` property.
     */
    @Input()
    itemsPerPageTemplate: TemplateRef<any>;

    /** Label for options for items per page. */
    @Input()
    itemsPerPageLabel = 'Results per page';

    /** Represents the options for items per page. */
    @Input()
    get itemsPerPageOptions(): number[] {
        return this._itemsPerPageOptions;
    }
    set itemsPerPageOptions(value: number[]) {
        this._itemsPerPageOptions = coerceArray<number>(value)
            .filter(v => v > 0 && v < this.totalItems)
            .sort((a, b) => a - b);
        if (this._itemsPerPageOptions.some(v => v !== this.itemsPerPage)) {
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

    /** Label for the 'previous' page button. */
    @Input()
    previousLabel = 'Previous';

    /** Label for the 'next' page button. */
    @Input()
    nextLabel = 'Next';

    /** Label for the 'Page' page button. */
    @Input()
    pageLabel = 'Page';

    /** Aria label for the navigation element */
    @Input()
    ariaLabel = 'Pagination';

    /** Event fired when the page is changed. */
    @Output()
    pageChangeStart = new EventEmitter<number>();

    /** @hidden */
    rtl = false;

    /** @hidden */
    get rtlClass(): string {
        return this.rtl ? 'fd-pagination__total--rtl' : '';
    }

    /** @hidden */
    pages: number[] = [];
    /** @hidden */
    get isFirstPage(): boolean {
        return this.currentPage === 1;
    };
    get isLastPage(): boolean {
        return this.currentPage === this.paginationService.getTotalPages(this.getPaginationObject());
    };

    get currentShowing(): CurrentShowing {
        return this._currentShowing;
    };
    /** @hidden */
    private _currentShowing: CurrentShowing = {
        from: 0,
        to: 0,
        of: 0
    };
    /** @hidden */
    private _itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;
    /** @hidden */
    private _itemsPerPageOptions: number[];
    /** @hidden */
    private _currentPage = 1;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor (
        private readonly paginationService: PaginationService,
        private readonly _cd: ChangeDetectorRef,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    onChangePerPage = (event: number) => {
        this.itemsPerPage = event;
        this._refreshPages();
        const maxPage = this.pages[this.pages.length - 1];
        if (this.currentPage > maxPage) {
            this.pageChangeStart.emit(maxPage);
        }
    };

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.currentPage) {
            this.currentPage = changes.currentPage.currentValue;
        }

        this._refreshPages();

        const pagination = this.getPaginationObject();
        const totalPages = this.paginationService.getTotalPages(pagination);
        if (!this.currentPage || this.currentPage < 1) {
            this.currentPage = 1;
        } else if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (this._rtlService) {
            this._subscriptions.add(this._rtlService.rtl.subscribe((value) => {
                this.rtl = value;
                this._refreshPages();
            }));
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param page The number of the page.
     * @param $event The keyboard event.
     */
    onKeypressHandler(page: number, $event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode($event, SPACE) || KeyUtil.isKeyCode($event, ENTER)) {
            $event.preventDefault();
            this.goToPage(page);
        }
    }

    /**
     * Navigates to a specific page.
     * @param page The number of the page to navigate to.
     * @param $event The mouse event (optional).
     */
    goToPage(page: number, $event?: MouseEvent): void {
        if ($event) {
            $event.preventDefault();
        }
        if (page > this.paginationService.getTotalPages(this.getPaginationObject()) || page < 1) {
            return;
        }
        this._refreshPages();

        this.pageChangeStart.emit(page);
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

    /**
     * Retrieves an object that represents
     * the total number of items, the current page, and the number of items per page.
     */
    getPaginationObject(): Pagination {
        return {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPerPage
        };
    }

    /** @hidden */
    private _refreshPages(): void {
        const pagination = this.getPaginationObject();
        let pages = this.paginationService.getPages(pagination);
        if (this.rtl) {
            pages = pages.slice().reverse();
        }
        this.pages = pages;

        this._currentShowing.from = this.currentPage - 1 === 0 ? 1 : (this.currentPage - 1) * pagination.itemsPerPage + 1;
        this._currentShowing.to = Math.min((this.currentPage - 1) * pagination.itemsPerPage + pagination.itemsPerPage, this.totalItems);
        this._currentShowing.of = this.totalItems;

        this._cd.markForCheck();
    }
}
